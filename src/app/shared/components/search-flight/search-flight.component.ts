import {Component, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SearchFlightService} from '../../../core/services/search-flight.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Weather} from '../../../core/models/weather.model';
import {City} from '../../../core/enums/generic/city.enum';
import {UtilityService} from '../../../core/services/utility.service';

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
  public keys: any;

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
    this.getValuesFromEnum();
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

    this.router.navigate(['search'], {relativeTo: this.route, queryParams: this.departureForm.value, queryParamsHandling: 'merge'});

  }

  public parseDepartureData(event): void {
    console.log(event);
    this.departureForm.value.departureDate = UtilityService.parseDate(event as Date);
    console.log(UtilityService.parseDate(event as Date));
  }

  public parseArrivalDate(event): void {
    this.departureForm.value.arrivalDate = UtilityService.parseDate(event as Date);
    console.log(UtilityService.parseDate(event as Date));
  }

  public getValuesFromEnum(): void {
    this.keys = Object.keys(City);
    console.log(this.keys);
  }

}
