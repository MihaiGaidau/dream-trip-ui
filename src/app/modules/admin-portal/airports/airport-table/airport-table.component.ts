import {Component, OnInit} from '@angular/core';
import {Airport} from '../../../../core/models/airport.model';
import {ActivatedRoute, Router} from '@angular/router';
import {AirportService} from '../../../../core/services/airport.service';
import {Observable} from 'rxjs';
import {ToastService} from '../../../../core/services/toast.service';

@Component({
  selector: 'app-airport-table',
  templateUrl: './airport-table.component.html',
  styleUrls: ['./airport-table.component.scss']
})
export class AirportTableComponent implements OnInit {

  public airports$: Observable<Airport[]>;

  constructor(public readonly router: Router,
              public readonly route: ActivatedRoute,
              private readonly airportService: AirportService,
              private readonly toastService: ToastService) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.airports$ = this.airportService.getAllAirports();

  }

  onCreate() {
    this.router.navigate(['../create'], {relativeTo: this.route});
  }

  onView(id: number) {
    this.router.navigate(['../' + id + '/view'], {relativeTo: this.route});

  }

  onEdit(id: number) {
    this.router.navigate(['../' + id + '/edit'], {relativeTo: this.route});

  }

  onDelete(id: number) {
    this.airportService.deleteAirport(id).subscribe(airport => {
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
