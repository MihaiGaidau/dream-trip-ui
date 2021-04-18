import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {TicketsComponent} from './tickets.component';
import {TicketTableComponent} from './ticket-table/ticket-table.component';
import {TicketCreateComponent} from './ticket-create/ticket-create.component';
import {TicketViewComponent} from './ticket-view/ticket-view.component';
import {SharedModule} from '../../../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: TicketsComponent,
    children: [
      {
        path: 'overview',
        component: TicketTableComponent
      },
      {
        path: 'create',
        component: TicketCreateComponent
      },
      {
        path: ':id/edit',
        component: TicketCreateComponent
      },
      {
        path: ':id/view',
        component: TicketViewComponent
      }
    ]
  }
];


@NgModule({
  declarations: [
    TicketsComponent,
    TicketCreateComponent,
    TicketTableComponent,
    TicketViewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class TicketsModule {
}
