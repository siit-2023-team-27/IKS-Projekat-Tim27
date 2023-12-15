import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccommodationCardComponent } from './accommodation-card/accommodation-card.component';
import { AccommodationCardsComponent } from './accommodation-cards/accommodation-cards.component';
import { RouterModule } from '@angular/router';
import {LayoutModule} from "../layout/layout.module";
import { CreateAccommodationComponent } from './create-accommodation/create-accommodation.component';
import {SharedModule} from "../shared/shared.module";
import {FormsModule} from "@angular/forms";
import {AccommodationDetailViewModule} from "../accommodation-detail-view/accommodation-detail-view.module";
import { AccommodationCardsHostComponent } from './accommodation-cards-host/accommodation-cards-host.component';
import { AccommodationCardHostComponent } from './accommodation-card-host/accommodation-card-host.component';



@NgModule({
  declarations: [
    AccommodationCardComponent,
    AccommodationCardsComponent,
    CreateAccommodationComponent,
    AccommodationCardsHostComponent,
    AccommodationCardHostComponent
  ],
  imports: [
    CommonModule, RouterModule, SharedModule, FormsModule, AccommodationDetailViewModule,LayoutModule
  ],
  exports: [
    AccommodationCardComponent,
    AccommodationCardsComponent,
    CreateAccommodationComponent,
    AccommodationCardsHostComponent,
    AccommodationCardHostComponent
  ]
})
export class AccommodationModule { }
