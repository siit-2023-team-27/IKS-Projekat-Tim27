import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./account/login/login.component";
import {NavigationComponent} from "./layout/navigation/navigation.component";
import {RegisterComponent} from "./account/register/register.component";
import { AllAccommodationComponent } from './all-accommodation/all-accommodation.component';
import { FilterAccommodationComponent } from './filter-accommodation/filter-accommodation.component';
import { AccommodationDetailsComponent } from './accommodation-details/accommodation-details.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'all-accommodation', component:AllAccommodationComponent},
  {path: 'filter-accommodation', component: FilterAccommodationComponent},
  {path: 'home', component: NavigationComponent},
  {path: 'accommodation-details', component: AccommodationDetailsComponent}
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
