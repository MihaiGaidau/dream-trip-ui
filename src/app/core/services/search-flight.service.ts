import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Departure} from '../models/departure.model';

@Injectable({
  providedIn: 'root'
})
export class SearchFlightService {
  departureFlights = new BehaviorSubject<Departure[]>(null);

  constructor() {
  }

  searchFlight(departure: Departure): void {
    console.log(departure);
  }
}
