import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./account/login/login.component";
import {NavigationComponent} from "./layout/navigation/navigation.component";
import {RegisterComponent} from "./account/register/register.component";
import {AccommodationCardsComponent} from "./accommodation/accommodation-cards/accommodation-cards.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'home', component: NavigationComponent},
  {path: 'accommodations', component: AccommodationCardsComponent}
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
