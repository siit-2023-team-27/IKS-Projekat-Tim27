import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavigationComponent} from "./navigation/navigation.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {RouterLink} from "@angular/router";
import { SearchBarComponent } from './search-bar/search-bar.component';
import {MaterialModule} from "../infrastructure/material/material.module";
import { ModalDeactivateAccountComponent } from './modal-deactivate-account/modal-deactivate-account.component';
import { FilterComponent } from './filter/filter.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSliderModule} from '@angular/material/slider';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    NavigationComponent,
    SearchBarComponent,
    ModalDeactivateAccountComponent,
    FilterComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterLink,
    MaterialModule,
    MatCheckboxModule,
    MatSliderModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    NavigationComponent,
    SearchBarComponent,
    ModalDeactivateAccountComponent
  ]
})
export class LayoutModule { }
