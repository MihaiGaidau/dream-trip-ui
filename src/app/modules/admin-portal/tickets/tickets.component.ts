import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {

  constructor(private readonly router: Router,
              private readonly  route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.router.navigate(['overview'], {relativeTo: this.route});
  }

}
