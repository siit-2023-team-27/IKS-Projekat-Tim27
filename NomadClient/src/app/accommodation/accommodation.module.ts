import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccommodationCardComponent } from './accommodation-card/accommodation-card.component';
import { AccommodationCardsComponent } from './accommodation-cards/accommodation-cards.component';
import { RouterModule } from '@angular/router';
import { CreateAccommodationComponent } from './create-accommodation/create-accommodation.component';



@NgModule({
  declarations: [
    AccommodationCardComponent,
    AccommodationCardsComponent,
    CreateAccommodationComponent
  ],
  imports: [
    CommonModule, RouterModule
  ],
  exports: [
    AccommodationCardComponent,
    AccommodationCardsComponent,
    CreateAccommodationComponent,
  ]
})
export class AccommodationModule { }
