import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MailListComponent } from './components/mail.list.component';
import { CorporationListComponent } from './components/corporation.list.component';
import { CorporationComponent } from './components/corporation.component';
import { SubsidiaryListComponent } from './components/subsidiary.list.component';



const routes: Routes = [
	{path:'', component: CorporationListComponent}, 
	{path:'corporation', component: CorporationComponent}, 
	{path:'subsidiary-list', component: SubsidiaryListComponent}, 
	{path:'mail-list', component: MailListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
