import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PurchaseComponent} from './purchase.component';
import {PersonalDataComponent} from './personal-data/personal-data.component';
import {PassportDataComponent} from './passport-data/passport-data.component';
import {CardDataComponent} from './card-data/card-data.component';


const routes: Routes = [{
  path: '',
  component: PurchaseComponent,
  children: [
    {path: '', redirectTo: 'personal-data', pathMatch: 'full'},
    {path: 'personal-data', component: PersonalDataComponent},
    {path: 'passport-data', component: PassportDataComponent},
    {path: 'card-data', component: CardDataComponent}]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRoutingModule {
}
