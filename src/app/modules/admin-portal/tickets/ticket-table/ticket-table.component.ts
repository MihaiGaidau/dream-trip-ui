import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-ticket-table',
  templateUrl: './ticket-table.component.html',
  styleUrls: ['./ticket-table.component.scss']
})
export class TicketTableComponent implements OnInit {

  constructor(private readonly router: Router,
              private readonly  route: ActivatedRoute) {
  }

  ngOnInit(): void {
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

  onDelete(id: string) {

  }
}
