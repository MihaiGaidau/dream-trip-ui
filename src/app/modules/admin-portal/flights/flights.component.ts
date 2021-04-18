import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss']
})
export class FlightsComponent implements OnInit {

  constructor(private readonly router: Router,
              private readonly  route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.router.navigate(['overview'], {relativeTo: this.route});
  }

}


