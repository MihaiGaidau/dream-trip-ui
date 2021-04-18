import {Component, OnInit} from '@angular/core';
import {SearchFlightService} from '../../../core/services/search-flight.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Departure} from "../../../core/models/departure.model";
import {FlightsModule} from "../../../modules/admin-portal/flights/flights.module";
import {FlightService} from "../../../core/services/flight.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public search: any;
  public flights$: Observable<any[]>;

  constructor(private readonly flightService: FlightService,
              private readonly router: Router,
              private readonly route: ActivatedRoute) {
  }

  ngOnInit(): void {
    if (window.history.state && window.history.state.data) {
      this.search = window.history.state.data;
      console.log(this.search);
      // this.flights$ = this.flightService.searchFlight(this.search);
    }

  }


}
