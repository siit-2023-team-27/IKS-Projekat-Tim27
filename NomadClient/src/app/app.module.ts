import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {LayoutModule} from "./layout/layout.module";
import {AccountModule} from "./account/account.module";
import {RouterOutlet} from "@angular/router";
import { AppRoutingModule } from './app-routing.module';
import { AllAccommodationComponent } from './all-accommodation/all-accommodation.component';
import { FilterAccommodationComponent } from './filter-accommodation/filter-accommodation.component';

@NgModule({
  declarations: [
    AppComponent,
    
      ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    LayoutModule,
    AccountModule,
    RouterOutlet,
    AppRoutingModule,
    AllAccommodationComponent,
    FilterAccommodationComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
