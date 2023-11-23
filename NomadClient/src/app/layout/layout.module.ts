import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavigationComponent} from "./navigation/navigation.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {RouterLink} from "@angular/router";




@NgModule({
  declarations: [
    NavigationComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterLink,
  ],
  exports: [
    NavigationComponent,
  ]
})
export class LayoutModule { }
