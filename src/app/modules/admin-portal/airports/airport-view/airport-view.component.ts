import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AirportService} from '../../../../core/services/airport.service';
import {Location} from '@angular/common';
import {map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-airport-view',
  templateUrl: './airport-view.component.html',
  styleUrls: ['./airport-view.component.scss']
})
export class AirportViewComponent implements OnInit {
  public form: FormGroup;

  constructor(private readonly router: Router,
              private readonly route: ActivatedRoute,
              private airportService: AirportService,
              public formBuilder: FormBuilder,
              public location: Location) {
    this.onCreateForm();
  }

  ngOnInit(): void {
    this.getAirport();
  }

  public getAirport(): void {
    this.route.paramMap.pipe(map(param => param.get('id')), switchMap(id => this.airportService.getAirportById(id)))
      .subscribe(airport => this.form.patchValue(airport), error => console.log(error));
  }

  public onCreateForm(): void {
    this.form = this.formBuilder.group({
      name: [null],
      city: [null],
      code: [null],
    });
  }


  onGoBack() {
    this.location.back();
  }
}
