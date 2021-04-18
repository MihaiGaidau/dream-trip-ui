import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AirportsComponent} from './airports.component';
import {AirportTableComponent} from './airport-table/airport-table.component';
import {AirportCreateComponent} from './airport-create/airport-create.component';
import {AirportViewComponent} from './airport-view/airport-view.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastModule} from 'primeng/toast';


const routes: Routes = [
  {
    path: '',
    component: AirportsComponent,
    children: [
      {
        path: ':id/edit',
        component: AirportCreateComponent
      },
      {
        path: ':id/view',
        component: AirportViewComponent
      },
      {
        path: 'overview',
        component: AirportTableComponent
      },
      {
        path: 'create',
        component: AirportCreateComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    AirportsComponent,
    AirportTableComponent,
    AirportCreateComponent,
    AirportViewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    FormsModule,
    ToastModule,
    ReactiveFormsModule
  ]
})
export class AirportsModule {
}
