import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastService} from '../../../../core/services/toast.service';
import {Location} from '@angular/common';
import {FlightService} from '../../../../core/services/flight.service';
import {Flight, FlightData} from '../../../../core/models/flight.model';
import {Observable} from 'rxjs';
import {Airport, AirportData} from '../../../../core/models/airport.model';
import {AirportService} from '../../../../core/services/airport.service';

@Component({
  selector: 'app-flight-create',
  templateUrl: './flight-create.component.html',
  styleUrls: ['./flight-create.component.scss']
})
export class FlightCreateComponent implements OnInit {


  public form: FormGroup = new FormGroup({
    arrivalDate: new FormControl(),
    departureDate: new FormControl(),
    // arrivalDestination: new FormControl(),
    // departureDestination: new FormControl(),
    availableTickets: new FormControl(),
    ticketPrice: new FormControl(),
    number: new FormControl(),
    arrivalAirportId: new FormControl(),
    departureAirportId: new FormControl()

  });
  public flight: FlightData;
  public flightId: number;
  public airports$: Observable<Airport[]>;
  public airports: AirportData[];
  public obtainedFlight: { id?: any; departureDate: Date; number: string; ticketPrice: number; arrivalDate: Date; availableTickets: number; createDate: Date; arrivalAirportId: number; departureAirportId: number; arrivalAirport: { city: string; code: string; name: string }; departureAirport: { city: string; code: string; name: string } };
  public departAiportId: number;
  public arrivAiportId: number;

  constructor(private readonly router: Router,
              private readonly  route: ActivatedRoute,
              private readonly formBuilder: FormBuilder,
              private readonly flightService: FlightService,
              private readonly toastService: ToastService,
              private readonly location: Location,
              private readonly airportService: AirportService) {
  }

  ngOnInit(): void {
    this.airportService.getAllAirports().subscribe((data) => {
      this.airports = data.content;
    });
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
      number: [this.flight.number ? this.flight.number : null, Validators.required],
      arrivalDate: [new Date(this.flight.arrivalDate), Validators.required],
      departureDate: [new Date(this.flight.departureDate), Validators.required],
      // departureDestination: [this.flight.departureAirport, Validators.required],
      availableTickets: [this.flight.availableTickets, Validators.required],
      ticketPrice: [this.flight.ticketPrice, Validators.required],
      arrivalAirportId: [this.airports.filter(it => it.name === this.flight.arrivalAirport.name)[0].id, Validators.required],
      departureAirportId: [this.airports.filter(it => it.name === this.flight.departureAirport.name)[0].id, Validators.required]
    });
  }

  public createForm(): void {
    this.form = this.formBuilder.group({
      number: [null, Validators.required],
      arrivalDate: [null, Validators.required],
      arrivalAirportId: [null, Validators.required],
      departureAirportId: [null, Validators.required],
      departureDate: [null, Validators.required],
      arrivalAirport: [null, Validators.required],
      departureAirport: [null, Validators.required],
      availableTickets: [null, Validators.required],
      ticketPrice: [null, Validators.required]

    });
  }

  public onSubmit(): void {

    this.form.value.arrivalAirportId = +this.form.value.arrivalAirportId;
    this.form.value.departureAirportId = +this.form.value.departureAirportId;
    if (this.flightId) {
      console.log(this.form.value);
      this.flightService.updateFlight(this.flight.id, this.form.value).subscribe((flight) => {
        this.router.navigate(['../../overview'], {relativeTo: this.route});
      }, error => {
        this.router.navigate(['../../overview'], {relativeTo: this.route});
      });
    } else {
      console.log(this.form.value);
      this.flightService.createFlight(this.form.value).subscribe(flight => {
          this.arrivAiportId = this.form.value.arrivAiportId;
          this.departAiportId = this.form.value.departureAirportId;
          this.router.navigate([`/admin-portal/flights/overview`]);
          setTimeout(() => {
            this.toastService.add({
              type: 'success',
              title: 'Created successfully',
              message: `flight was added`
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
