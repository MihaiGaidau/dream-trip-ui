import {NgModule} from '@angular/core';
import {AdminPortalComponent} from './admin-portal.component';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../../core/guards/auth.guard';
import {FlightsComponent} from './flights/flights.component';
import {FlightTableComponent} from './flights/flight-table/flight-table.component';
import {FlightCreateComponent} from './flights/flight-create/flight-create.component';
import {FlightViewComponent} from './flights/flight-view/flight-view.component';
import {TicketsComponent} from './tickets/tickets.component';
import {TicketCreateComponent} from './tickets/ticket-create/ticket-create.component';
import {TicketTableComponent} from './tickets/ticket-table/ticket-table.component';
import {TicketViewComponent} from './tickets/ticket-view/ticket-view.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPortalComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'airports',
        loadChildren: () => import('./airports/airports.module').then(m => m.AirportsModule)
      },
      {
        path: 'flights',
        loadChildren: () => import('./flights/flights.module').then(m => m.FlightsModule)
      },
      {
        path: 'tickets',
        loadChildren: () => import('./tickets/tickets.module').then(m => m.TicketsModule)
      },
    ]
  }
];

@NgModule({
  declarations: [
    AdminPortalComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    AdminPortalComponent
  ]
})

export class AdminPortalModule {
}
