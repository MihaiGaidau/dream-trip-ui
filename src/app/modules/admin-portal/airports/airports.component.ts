import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-airports',
  templateUrl: './airports.component.html',
  styleUrls: ['./airports.component.scss']
})
export class AirportsComponent implements OnInit {

  constructor(private readonly route: ActivatedRoute,
              private readonly  router: Router) {
  }

  ngOnInit(): void {
    this.router.navigate(['overview'], {relativeTo: this.route});
  }

}
