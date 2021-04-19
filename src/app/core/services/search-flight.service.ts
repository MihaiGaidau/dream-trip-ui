import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Departure} from '../models/departure.model';
import {HttpClient} from '@angular/common/http';
import {Weather} from '../models/weather.model';
import {environment} from '../../../environments/environment';
import {LoaderService} from './loader.service';
import {Flight} from '../models/flight.model';

@Injectable({
  providedIn: 'root'
})
export class SearchFlightService {
  departureFlights = new BehaviorSubject<Departure[]>(null);
  protected apiUrl = environment.apiUrl;
  protected endpointUrl = environment.endpointUrl;

  constructor(private readonly http: HttpClient,
              private readonly loaderService: LoaderService) {
  }

  public searchFlight(departure: Departure): Observable<Flight> {
    return this.loaderService.showLoaderUntilCompleted(this.http.post<Flight>(this.apiUrl + this.endpointUrl + 'flights/search', departure));
  }

  public getWeatherByCity(city: string): Observable<Weather> {
    return this.loaderService.showLoaderUntilCompleted(this.http.get<Weather>(this.apiUrl + this.endpointUrl + `weather/${city}`));
  }


}
