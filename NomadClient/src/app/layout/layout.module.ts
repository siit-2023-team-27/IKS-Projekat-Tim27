import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavigationComponent} from "./navigation/navigation.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {RouterLink} from "@angular/router";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { SearchBarComponent } from './search-bar/search-bar.component';
import {MaterialModule} from "../infrastructure/material/material.module";
import { ModalDeactivateAccountComponent } from './modal-deactivate-account/modal-deactivate-account.component';




@NgModule({
  declarations: [
    NavigationComponent,
    SearchBarComponent,
    ModalDeactivateAccountComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterLink,
    MaterialModule

  ],
  exports: [
    NavigationComponent,
    SearchBarComponent,
    ModalDeactivateAccountComponent,
  ]
})
export class LayoutModule { }
