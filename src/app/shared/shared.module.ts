import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './components/footer/footer.component';
import {HeaderComponent} from './components/header/header.component';
import {TransformPipe} from './pipes/transform.pipe';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {SearchFlightComponent} from './components/search-flight/search-flight.component';
import {BasicCalendarComponent} from './components/basic-calendar/basic-calendar.component';
import {CalendarModule} from 'primeng/calendar';
import {SelectDateModalComponent} from './components/select-date-modal/select-date-modal.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SidebarModule} from 'primeng/sidebar';
import { LogInModalComponent } from './modals/log-in-modal/log-in-modal.component';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { AdminSidebarComponent } from './components/admin-sidebar/admin-sidebar.component';
import { ToastComponent } from './components/toast/toast.component';
import { SearchComponent } from './components/search/search.component';
import { LoaderComponent } from './components/loader/loader.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { PurchaseModalComponent } from './components/search/purchase-modal/purchase-modal.component';


@NgModule({
  declarations: [FooterComponent, HeaderComponent, TransformPipe, SearchFlightComponent, BasicCalendarComponent, SelectDateModalComponent, LogInModalComponent, AdminSidebarComponent, ToastComponent, SearchComponent, LoaderComponent, PurchaseModalComponent],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    CalendarModule,
    ReactiveFormsModule,
    FormsModule,
    SidebarModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    TransformPipe,
    SearchFlightComponent,
    LogInModalComponent,
    ToastComponent,
    LoaderComponent
  ],
  entryComponents: [LogInModalComponent],
  providers: [{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class SharedModule {
}
