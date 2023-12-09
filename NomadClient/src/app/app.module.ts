import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {AccommodationModule} from "./accommodation/accommodation.module";
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthModule} from "./infrastructure/auth/auth.module";
import {AuthService} from "./infrastructure/auth/auth.service";
import { AccommodationVerificationComponent } from './accommodation-details/accommodation-verification/accommodation-verification.component';
import {Interceptor} from "./infrastructure/auth/jwt/jwt.inceptor";

@NgModule({
  declarations: [
    AppComponent,
    AccommodationVerificationComponent,


      ],
  imports: [
    AccommodationDetailViewModule,
    BrowserModule,
    FontAwesomeModule,
    LayoutModule,
    AccountModule,
    RouterOutlet,
    AppRoutingModule,
    BrowserAnimationsModule,
    AccommodationModule,
    HttpClientModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    AuthModule
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: Interceptor,
    multi: true,
  }
  ,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
