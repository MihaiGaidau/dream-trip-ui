import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './modules/home/home.component';
import {AboutComponent} from './modules/about/about.component';
import {ServicesComponent} from './modules/services/services.component';
import {ContactsComponent} from './modules/contacts/contacts.component';
import {FaqComponent} from './modules/faq/faq.component';
import {AirlineRoutes} from './core/enums/generic/routes.enum';
import {SearchComponent} from "./shared/components/search/search.component";


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'auth', component: HomeComponent},
  {path: AirlineRoutes.home, component: HomeComponent},
  {path: AirlineRoutes.about, component: AboutComponent},
  {path: AirlineRoutes.services, component: ServicesComponent},
  {path: AirlineRoutes.contacts, component: ContactsComponent},
  {path: AirlineRoutes.faq, component: FaqComponent},
  {path: AirlineRoutes.search, component: SearchComponent},
  {
    path: 'admin-portal',
    loadChildren: () => import('./modules/admin-portal/admin-portal.module').then(m => m.AdminPortalModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
