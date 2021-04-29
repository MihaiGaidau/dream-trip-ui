import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SearchComponent} from '../search/search.component';
import {SearchByGuidComponent} from './search-by-guid.component';


const routes: Routes = [{path: '', component: SearchByGuidComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchByGuidRoutingModule { }
