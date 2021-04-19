import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {LoaderService} from './loader.service';
import {Flight, FlightData} from '../models/flight.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  protected apiUrl = environment.apiUrl;
  protected endpointUrl = environment.endpointUrl;

  constructor(private readonly http: HttpClient,
              private readonly  loaderService: LoaderService) {
  }

  public createFlight(body: Flight): Observable<Flight> {
    return this.loaderService.showLoaderUntilCompleted(this.http.post<Flight>(this.apiUrl + this.endpointUrl + 'flights', body));

  }

  public getFlightById(flightId): Observable<FlightData> {
    return this.loaderService.showLoaderUntilCompleted(this.http.get<FlightData>(this.apiUrl + this.endpointUrl + `flights/${flightId}`));
  }

  public getAllFlights(body: any): Observable<Flight> {
    return this.loaderService.showLoaderUntilCompleted(this.http.post<Flight>(this.apiUrl + this.endpointUrl + 'flights/search', body));
  }

  public updateFlight(id: number, flight: FlightData): Observable<FlightData> {
    return this.loaderService.showLoaderUntilCompleted(this.http.patch<FlightData>(`${this.apiUrl}${this.endpointUrl}flights/${id}`, flight));
  }

  public deleteFlight(flightId: number): Observable<void> {
    return this.loaderService.showLoaderUntilCompleted(this.http.delete<void>(this.apiUrl + this.endpointUrl + `flights/${flightId}`));
  }
}
