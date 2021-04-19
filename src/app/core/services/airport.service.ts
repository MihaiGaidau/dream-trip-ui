import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Airport, AirportData} from '../models/airport.model';
import {LoaderService} from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class AirportService {
  protected apiUrl = environment.apiUrl;
  protected endpointUrl = environment.endpointUrl;

  constructor(public readonly http: HttpClient,
              private readonly  loaderService: LoaderService) {
  }

  public createAirport(body: Airport): Observable<Airport> {
    return this.loaderService.showLoaderUntilCompleted(this.http.post<Airport>(this.apiUrl + this.endpointUrl + 'airports', body));

  }

  public getAirportById(airportId): Observable<AirportData> {
    return this.loaderService.showLoaderUntilCompleted(this.http.get<AirportData>(this.apiUrl + this.endpointUrl + `airports/${airportId}`));
  }

  public getAllAirports(): Observable<Airport> {
    return this.loaderService.showLoaderUntilCompleted(this.http.get<Airport>(this.apiUrl + this.endpointUrl + 'airports'));
  }

  public updateAirport(id: number, airport: Airport): Observable<Airport> {
    return this.loaderService.showLoaderUntilCompleted(this.http.patch<Airport>(`${this.apiUrl}${this.endpointUrl}airports/${id}`, airport));
  }

  public deleteAirport(airportId: number): Observable<void> {
    return this.loaderService.showLoaderUntilCompleted(this.http.delete<void>(this.apiUrl + this.endpointUrl + `airports/${airportId}`));
  }


}
