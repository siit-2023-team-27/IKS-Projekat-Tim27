import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccommodationCardComponent } from './accommodation-card/accommodation-card.component';
import { AccommodationCardsComponent } from './accommodation-cards/accommodation-cards.component';
import { RouterModule } from '@angular/router';
import { CreateAccommodationComponent } from './create-accommodation/create-accommodation.component';
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [
    AccommodationCardComponent,
    AccommodationCardsComponent,
    CreateAccommodationComponent
  ],
  imports: [
    CommonModule, RouterModule, SharedModule
  ],
  exports: [
    AccommodationCardComponent,
    AccommodationCardsComponent,
    CreateAccommodationComponent,
  ]
})
export class AccommodationModule { }
