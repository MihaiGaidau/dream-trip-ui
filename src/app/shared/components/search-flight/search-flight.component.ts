import {Component, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Departure} from '../../../core/models/departure.model';
import {SearchFlightService} from '../../../core/services/search-flight.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Weather} from '../../../core/models/weather.model';

@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.scss']
})
export class SearchFlightComponent implements OnInit {
  public departureForm: FormGroup;

  @Output()
  public fromDestionationCityWeather$: Observable<Weather>;

  @Output()
  public toDestinationCityWeather$: Observable<Weather>;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly sfService: SearchFlightService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {

    this.initDepartureForm();
  }

  get oneWayValue(): boolean {
    return this.departureForm.get('oneWay').value;
  }

  ngOnInit(): void {
  }

  private initDepartureForm(): void {
    this.departureForm = this.formBuilder.group({
      departureCity: [null],
      arrivalCity: [null],
      departureDate: [null, Validators.compose([Validators.required])],
      arrivalDate: [null],
      ticketPrice: [null],
      oneWay: [true]
    });
  }

  public onGetOneWayValue(isChecked: boolean): void {
    this.departureForm.get('oneWay').setValue(isChecked);
    console.log(this.oneWayValue);

  }

  public onSubmit(): void {
    const departure = {
      departureDate: this.departureForm.value.departureDate,
      departureCity: this.departureForm.value.departureCity,
      oneWay: this.departureForm.value.oneWay,
      ticketPrice: this.departureForm.value.ticketPrice,
      arrivalDate: this.departureForm.value.arrivalDate,
      arrivalCity: this.departureForm.value.arrivalCity,
    } as Departure;
    this.router.navigate(['search'], {state: {data: departure}});

  }

}
