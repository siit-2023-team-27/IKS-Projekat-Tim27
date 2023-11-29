import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {RouterLink} from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ProfileComponent} from "./profile/profile.component";
import {MaterialModule} from "../infrastructure/material/material.module";


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent
  ]
})
export class AccountModule { }
