import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Airport} from '../../../../core/models/airport.model';
import {ActivatedRoute, Router} from '@angular/router';
import {AirportService} from '../../../../core/services/airport.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-airport-view',
  templateUrl: './airport-view.component.html',
  styleUrls: ['./airport-view.component.scss']
})
export class AirportViewComponent implements OnInit {
  public form: FormGroup = new FormGroup({
    name: new FormControl(),
    city: new FormControl(),
    code: new FormControl()
  });
  public updatedObject: Airport;
  public isDisabled = true;

  constructor(private readonly router: Router,
              private readonly route: ActivatedRoute,
              private airportService: AirportService,
              public formBuilder: FormBuilder,
              public location: Location) {
    this.route.params.subscribe((params) => {
      const airportId = params.id;
      this.airportService.getAirportById(airportId).subscribe((response) => {
        this.updatedObject = response;
        this.onCreateForm();
      });
    });
  }

  ngOnInit(): void {
  }

  public onCreateForm(): void {
    this.form = this.formBuilder.group({
      name: [{
        value: this.updatedObject.name,
        disabled: true
      }, Validators.required],
      city: [{
        value: this.updatedObject.city,
        disabled: true
      }, Validators.required],
      code: [{
        value: this.updatedObject.code,
        disabled: true
      }, Validators.required
      ],
    });
  }

  onSubmit() {
    this.airportService.updateAirport(this.updatedObject.id, this.form.value).subscribe((airport) => {
      this.form.get('name').setValue(airport.name);
      this.form.get('city').setValue(airport.city);
      this.form.get('code').setValue(airport.code);
    });

  }

  onUpdate() {
    this.isDisabled = false;

  }

  onGoBack() {
    this.location.back();
  }
}
