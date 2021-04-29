import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseRoutingModule } from './purchase-routing.module';
import { PurchaseComponent } from './purchase.component';
import { PersonalDataComponent } from './personal-data/personal-data.component';
import { PassportDataComponent } from './passport-data/passport-data.component';
import { CardDataComponent } from './card-data/card-data.component';
import {CardModule} from 'primeng/card';
import {ReactiveFormsModule} from '@angular/forms';
import {StepsModule} from 'primeng/steps';
import {ToastModule} from 'primeng/toast';


@NgModule({
  declarations: [PurchaseComponent, PersonalDataComponent, PassportDataComponent, CardDataComponent],
  imports: [
    CommonModule,
    PurchaseRoutingModule,
    CardModule,
    ReactiveFormsModule,
    StepsModule,
    ToastModule
  ]
})
export class PurchaseModule { }
