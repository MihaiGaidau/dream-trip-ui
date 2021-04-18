import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastService} from '../../../../core/services/toast.service';
import {Location} from '@angular/common';
import {FlightService} from '../../../../core/services/flight.service';
import {Flight} from '../../../../core/models/flight.model';
import {Observable} from 'rxjs';
import {Airport} from '../../../../core/models/airport.model';
import {AirportService} from '../../../../core/services/airport.service';

@Component({
  selector: 'app-flight-create',
  templateUrl: './flight-create.component.html',
  styleUrls: ['./flight-create.component.scss']
})
export class FlightCreateComponent implements OnInit {


  public form: FormGroup = new FormGroup({
    number: new FormControl(),
    arrivalDate: new FormControl(),
    departureDate: new FormControl(),
    arrivalAirportId: new FormControl(),
    departureAirportId: new FormControl(),

  });
  public flight: Flight;
  public flightId: number;
  public airports$: Observable<Airport[]>;

  constructor(private readonly router: Router,
              private readonly  route: ActivatedRoute,
              private readonly formBuilder: FormBuilder,
              private readonly flightService: FlightService,
              private readonly toastService: ToastService,
              private readonly location: Location,
              private readonly airportService: AirportService) {
  }

  ngOnInit(): void {
    this.airports$ = this.airportService.getAllAirports();
    this.route.params.subscribe((params) => {
      this.flightId = params.id;
      if (this.flightId) {
        this.flightService.getFlightById(this.flightId).subscribe((response) => {
          this.flight = response;
          this.onEditForm();
        });
      }
    });
    if (!this.flightId) {
      this.createForm();

    }

  }

  public onEditForm(): void {
    this.form = this.formBuilder.group({
      number: [this.flight.number, Validators.required],
      arrivalDate: [this.flight.arrivalDate, Validators.required],
      departureDate: [this.flight.departureDate, Validators.required],
      arrivalAirportId: [this.flight.arrivalAirportId, Validators.required],
      departureAirportId: [this.flight.departureAirportId, Validators.required]
    });
  }

  public createForm(): void {
    this.form = this.formBuilder.group({
      number: [null, Validators.required],
      arrivalDate: [null, Validators.required],
      arrivalAirportId: [null, Validators.required],
      departureAirportId: [null, Validators.required],
      departureDate: [null, Validators.required]

    });
  }

  public onSubmit(): void {

    this.form.value.arrivalAirportId = +this.form.value.arrivalAirportId;
    this.form.value.departureAirportId = +this.form.value.departureAirportId;
    console.log(this.form.value);
    if (this.flightId) {
      this.flightService.updateFlight(this.flight.id, this.form.value).subscribe((airport) => {
        this.form.get('number').setValue(airport.number);
        this.form.get('arrivalDate').setValue(airport.arrivalDate);
        this.form.get('departureDate').setValue(airport.departureDate);
        this.form.get('arrivalAirportId').setValue(airport.arrivalAirportId);
        this.form.get('departureAirportId').setValue(airport.departureAirportId);
      });
    } else {
      this.flightService.createFlight(this.form.value).subscribe(flight => {
          this.router.navigate([`/admin-portal/flights/overview`]);
          setTimeout(() => {
            this.toastService.add({
              type: 'success',
              title: 'Created successfully',
              message: `flight with id ${flight.id}`
            });
            this.form.reset();
          }, 200);
        }, error => {
          this.toastService.add({
            type: 'error',
            title: 'Culdn\'t create',
            message: 'flight with , verify connection or data'
          });
          this.form.reset();
        }
      );
    }

  }

  get arrivalDate() {
    return this.form.get('arrivalDate');
  }

  get departureDate() {
    return this.form.get('departureDate');
  }

  get number() {
    return this.form.get('number');
  }

  get arrivalAirportId() {
    return this.form.get('arrivalAirportId');
  }

  get departureAirportId() {
    return this.form.get('departureAirportId');
  }


  onGoBack(): void {
    this.location.back();
  }

}
