import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


import { PaginationComponent } from './components/pagination.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MailListComponent } from './components/mail.list.component';
import { CorporationListComponent } from './components/corporation.list.component';
import { CorporationComponent } from './components/corporation.component';
import { SubsidiaryListComponent } from './components/subsidiary.list.component';


@NgModule({
  declarations: [
    AppComponent,
	PaginationComponent,
	MailListComponent,
	CorporationListComponent,
	CorporationComponent,
	SubsidiaryListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	HttpClientModule,
	FormsModule,
	ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
