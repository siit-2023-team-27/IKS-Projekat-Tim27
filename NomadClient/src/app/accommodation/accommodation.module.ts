import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccommodationCardComponent } from './accommodation-card/accommodation-card.component';
import { AccommodationCardsComponent } from './accommodation-cards/accommodation-cards.component';
import { RouterModule } from '@angular/router';
import {LayoutModule} from "../layout/layout.module";



@NgModule({
  declarations: [
    AccommodationCardComponent,
    AccommodationCardsComponent
  ],
  imports: [
    CommonModule, RouterModule, LayoutModule
  ],
  exports: [
    AccommodationCardComponent,
    AccommodationCardsComponent
  ]
})
export class AccommodationModule { }
