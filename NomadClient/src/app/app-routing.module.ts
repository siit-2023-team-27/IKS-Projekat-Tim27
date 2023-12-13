import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./account/login/login.component";
import {NavigationComponent} from "./layout/navigation/navigation.component";
import {RegisterComponent} from "./account/register/register.component";
import { AccommodationDetailsComponent } from './accommodation-detail-view/accommodation-details/accommodation-details.component';
import {AccommodationCardsComponent} from "./accommodation/accommodation-cards/accommodation-cards.component";
import {AuthGuard} from "./infrastructure/auth/auth.guard";
import {ProfileComponent} from "./account/profile/profile.component";
import { AccommodationVerificationComponent } from './accommodation-detail-view/accommodation-verification/accommodation-verification.component';
import {CreateAccommodationComponent} from "./accommodation/create-accommodation/create-accommodation.component";

import { ReservationVerificationComponent } from './accommodation-detail-view/reservation-verification/reservation-verification.component';
import { GuestReservationsComponent } from './accommodation-detail-view/guest-reservations/guest-reservations.component';
const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'home', component: AccommodationCardsComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'accommodation-details/:id', component: AccommodationDetailsComponent},
  {path: 'accommodation-verification', component: AccommodationVerificationComponent},
  {path: 'accommodation-create', component: CreateAccommodationComponent},
  {path: 'reservation-verification', component: ReservationVerificationComponent},
  {path: 'guest-reservation', component: GuestReservationsComponent},
]
 // , canActivate: [AuthGuard]
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
