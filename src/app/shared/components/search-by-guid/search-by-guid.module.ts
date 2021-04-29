import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchByGuidRoutingModule } from './search-by-guid-routing.module';
import {SearchByGuidComponent} from './search-by-guid.component';


@NgModule({
  declarations: [SearchByGuidComponent],
  imports: [
    CommonModule,
    SearchByGuidRoutingModule
  ]
})
export class SearchByGuidModule { }
