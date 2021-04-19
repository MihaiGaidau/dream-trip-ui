import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Flight} from '../../../../core/models/flight.model';
import {FlightService} from '../../../../core/services/flight.service';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {map, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-flight-view',
  templateUrl: './flight-view.component.html',
  styleUrls: ['./flight-view.component.scss']
})
export class FlightViewComponent implements OnInit {
  public form: FormGroup;

  constructor(private readonly formBuilder: FormBuilder,
              private readonly flightService: FlightService,
              public location: Location,
              private readonly route: ActivatedRoute) {
    this.onCreateForm();

  }

  ngOnInit(): void {
    this.getFlight();
  }

  public getFlight(): void {
    this.route.paramMap.pipe(map(param => param.get('id')), switchMap(id => this.flightService.getFlightById(id)))
      .subscribe(flight => this.form.patchValue(flight), error => console.log(error));
  }

  public onCreateForm(): void {
    this.form = this.formBuilder.group({
      number: [null],
      arrivalDate: [null],
      departureDate: [null],
      arrivalAirport: this.formBuilder.group({
        city: [''],
        name: ['']
      }),
      departureAirport: this.formBuilder.group({
        city: [''],
        name: ['']
      }),
      availableTickets: [null],
      ticketPrice: [null]
    });
  }


  onGoBack() {
    this.location.back();
  }


}
