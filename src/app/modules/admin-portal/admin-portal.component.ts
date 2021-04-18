import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-admin-portal',
  templateUrl: './admin-portal.component.html',
  styleUrls: ['./admin-portal.component.scss']
})
export class AdminPortalComponent implements OnInit {


  constructor(public readonly route: ActivatedRoute,
              public readonly router: Router) {
  }

  ngOnInit(): void {
  }

  onNavigateTo(route: string) {

  }
}
