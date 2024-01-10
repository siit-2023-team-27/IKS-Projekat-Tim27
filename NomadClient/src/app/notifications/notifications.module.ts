import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './notifications/notifications.component';
import {LoginComponent} from "../account/login/login.component";
import {RegisterComponent} from "../account/register/register.component";
import {ProfileComponent} from "../account/profile/profile.component";



@NgModule({
  declarations: [
    NotificationsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NotificationsComponent
  ]
})
export class NotificationsModule { }
