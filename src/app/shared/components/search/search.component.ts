import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Params, Router} from '@angular/router';
import {FlightService} from '../../../core/services/flight.service';
import {Observable, of, Subscription} from 'rxjs';
import {Flight, FlightData} from '../../../core/models/flight.model';
import {PeriodofDay, Weather, WeatherDetails} from '../../../core/models/weather.model';
import {SearchFlightService} from '../../../core/services/search-flight.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public search: any;
  public flights$: Observable<Flight>;

  public fromDestionationCityWeather$: Observable<Weather>;
  public toDestinationCityWeather$: Observable<Weather>;
  public departureObjectWeather: WeatherDetails;
  public arrivalObjectWeather: WeatherDetails;
  public departureCityName: string;
  public arrivalCityName: string;
  public periodOfDay: PeriodofDay;
  public displayPurchaseModal: boolean;
  private getSearchSubscription: Subscription;
  public flights: FlightData[];

  constructor(private readonly flightService: FlightService,
              private readonly router: Router,
              private readonly route: ActivatedRoute,
              private readonly searchFlightService: SearchFlightService) {
  }

  ngOnInit(): void {
    this.getSearchFlights();
    // if (window.history.state && window.history.state.data) {
    //   this.search = window.history.state.data;
    this.getWeatherByCity();
    //   console.log(this.search);
    //   this.flights$ = this.searchFlightService.searchFlight(this.search);
    //
    // }
    this.checkDayPeriod();

  }
  private getSearchFlights(): void{
    this.getSearchSubscription = this.route.queryParamMap.pipe(
      switchMap((params: Params) => {
        console.log(params);
        return this.searchFlightService.searchFlight(params.params);
        // console.log(params);
        // return of();
      })
    ).subscribe(flights => {
      console.log(flights);
      this.flights = flights.content;
    }, error => {
      console.log(error);
    });
  }

  public getWeatherByCity(): void {
    this.fromDestionationCityWeather$ = this.route.queryParamMap.pipe(
      switchMap((params: Params) => {
        console.log(params);
        return this.searchFlightService.getWeatherByCity(params.params.departureCityName);
      })
    );

    this.toDestinationCityWeather$ = this.route.queryParamMap.pipe(
      switchMap((params: Params) => {
        console.log(params);
        return this.searchFlightService.getWeatherByCity(params.params.arrivalCityName);
      })
    );

    this.fromDestionationCityWeather$.subscribe((departure) => {

      departure.list.map(value => {
        this.departureCityName = value.name;
        this.departureObjectWeather = {
          temp: value.main.temp,
          pressure: value.main.pressure,
          humidity: value.main.humidity,
          feels_like: value.main.feels_like,
          temp_min: value.main.temp_min,
          temp_max: value.main.temp_max,
        };
      });
    });
    this.toDestinationCityWeather$.subscribe((arrival) => {
      arrival.list.map(value => {
        this.arrivalCityName = value.name;
        this.arrivalObjectWeather = {
          temp: value.main.temp,
          pressure: value.main.pressure,
          humidity: value.main.humidity,
          feels_like: value.main.feels_like,
          temp_min: value.main.temp_min,
          temp_max: value.main.temp_max,
        };
      });
    });
  }

  checkDayPeriod(): void {
    if (this.periodOfDay && this.periodOfDay.sys) {
      this.periodOfDay.sys.sunset = 28800000;
      const sunsetTime = new Date(this.periodOfDay.sys.sunset * 1000);
      this.periodOfDay.sunsetTime = sunsetTime.toLocaleTimeString();
      const currentDate = new Date();
      this.periodOfDay.isDay = (currentDate.getTime() < sunsetTime.getTime());
    }
  }

  public onOpenPurchaseModal(id: any) {
    console.log(id);
    sessionStorage.setItem('ticketId', id);
    this.router.navigate(['purchase-modal'], {relativeTo: this.route, queryParamsHandling: 'merge'});
  }

  public onClosePurchaseModal(isLoggin: boolean): void {
    console.log(isLoggin);
    this.displayPurchaseModal = isLoggin;
  }

}
