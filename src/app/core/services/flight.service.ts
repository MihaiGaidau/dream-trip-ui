import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {LoaderService} from './loader.service';
import {Flight} from '../models/flight.model';
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

  public getFlightById(flightId): Observable<Flight> {
    return this.loaderService.showLoaderUntilCompleted(this.http.get<Flight>(this.apiUrl + this.endpointUrl + `flights/${flightId}`));
  }

  public getAllFlights(): Observable<Flight[]> {
    return this.loaderService.showLoaderUntilCompleted(this.http.get<Flight[]>(this.apiUrl + this.endpointUrl + 'flights'));
  }

  public updateFlight(id: number, flight: Flight): Observable<Flight> {
    return this.loaderService.showLoaderUntilCompleted(this.http.put<Flight>(`${this.apiUrl}${this.endpointUrl}flights/${id}`, flight));
  }

  public deleteFlight(flightId: number): Observable<void> {
    return this.loaderService.showLoaderUntilCompleted(this.http.delete<void>(this.apiUrl + this.endpointUrl + `flights/${flightId}`));
  }
}
