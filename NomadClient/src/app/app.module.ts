import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {LayoutModule} from "./layout/layout.module";
import {AccountModule} from "./account/account.module";
import {RouterOutlet} from "@angular/router";
import { AppRoutingModule } from './app-routing.module';
import { AccommodationDetailsComponent } from './accommodation-detail-view/accommodation-details/accommodation-details.component';
import {BrowserAnimationsModule}  from '@angular/platform-browser/animations';
import { AccommodationDetailViewModule } from './accommodation-detail-view/accommodation-detail-view.module';


@NgModule({
  declarations: [
    AppComponent,
    
    
      ],
  imports: [
    AccommodationDetailViewModule,
    BrowserModule,
    FontAwesomeModule,
    LayoutModule,
    AccountModule,
    RouterOutlet,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
