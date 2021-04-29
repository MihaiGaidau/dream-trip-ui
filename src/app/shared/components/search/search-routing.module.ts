import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SearchComponent} from './search.component';


const routes: Routes = [{
  path: '', component: SearchComponent, children: [{path: 'purchase-modal', loadChildren: () => import('./purchase-modal/purchase/purchase.module').then(m => m.PurchaseModule)}]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule {
}
