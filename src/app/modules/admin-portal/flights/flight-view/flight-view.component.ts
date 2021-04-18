import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Flight} from '../../../../core/models/flight.model';
import {FlightService} from '../../../../core/services/flight.service';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-flight-view',
  templateUrl: './flight-view.component.html',
  styleUrls: ['./flight-view.component.scss']
})
export class FlightViewComponent implements OnInit {
  public form: FormGroup = new FormGroup({
    arrivalDate: new FormControl(),
    departureDate: new FormControl(),
    // arrivalAirportId: new FormControl(),
    // departureAirportId: new FormControl(),
    number: new FormControl()
  });
  public updatedObject: Flight;
  public isDisabled = true;

  constructor(private readonly formBuilder: FormBuilder,
              private readonly flightService: FlightService,
              public location: Location,
              private readonly route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      const flightId = params.id;
      this.flightService.getFlightById(flightId).subscribe((response) => {
        this.updatedObject = response;
        this.onCreateForm();
      });
    });
  }

  ngOnInit(): void {
  }

  public onCreateForm(): void {
    this.form = this.formBuilder.group({
      number: [{
        value: this.updatedObject.number,
        disabled: true
      }, Validators.required
      ],
      arrivalDate: [{
        value: this.updatedObject.arrivalDate,
        disabled: true
      }, Validators.required],
      departureDate: [{
        value: this.updatedObject.departureDate,
        disabled: true
      }, Validators.required]

    });
  }

  onSubmit() {
    this.flightService.updateFlight(this.updatedObject.id, this.form.value).subscribe((flight) => {
      this.form.get('number').setValue(flight.number);
      this.form.get('arrivalDate').setValue(flight.arrivalDate);
      this.form.get('departureDate').setValue(flight.departureDate);
    });

  }

  onUpdate() {
    this.isDisabled = false;

  }

  onGoBack() {
    this.location.back();
  }


}
