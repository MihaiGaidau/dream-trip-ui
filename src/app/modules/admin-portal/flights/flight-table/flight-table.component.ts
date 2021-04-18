import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Flight} from '../../../../core/models/flight.model';
import {FlightService} from '../../../../core/services/flight.service';
import {ToastService} from '../../../../core/services/toast.service';

@Component({
  selector: 'app-flight-table',
  templateUrl: './flight-table.component.html',
  styleUrls: ['./flight-table.component.scss']
})
export class FlightTableComponent implements OnInit {
  public flights$: Observable<Flight[]>;

  constructor(private readonly router: Router,
              private readonly  route: ActivatedRoute,
              private readonly flightService: FlightService,
              private readonly toastService: ToastService) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.flights$ = this.flightService.getAllFlights();

  }

  onCreate() {
    this.router.navigate(['../create'], {relativeTo: this.route});
  }

  onView(id: string) {
    this.router.navigate(['../' + id + '/view'], {relativeTo: this.route});

  }

  onEdit(id: string) {
    this.router.navigate(['../' + id + '/edit'], {relativeTo: this.route});

  }

  onDelete(id: number) {
    this.flightService.deleteFlight(id).subscribe(airport => {
      this.toastService.add({
        type: 'success',
        title: 'Deleted successfully',
        message: `airport with id ${id}`
      });
      this.getData();
    }, error => {
      this.toastService.add({
        type: 'error',
        title: 'Verify id for airport',
        message: `airport with id ${id}`
      });
    });

  }
}
