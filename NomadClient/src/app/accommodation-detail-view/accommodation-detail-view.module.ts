import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccommodationImagesComponent } from './accommodation-images/accommodation-images.component';
import { AccommodationDescriptionComponent } from './accommodation-description/accommodation-description.component';
import { MatCardModule } from '@angular/material/card';
import { AccommodationReservationComponent } from './accommodation-reservation/accommodation-reservation.component';
import {MatDatepickerModule} from "@angular/material/datepicker"
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { AccommodationAmenitiesComponent } from './accommodation-amenities/accommodation-amenities.component';
import { AccommodationCommentsComponent } from './accommodation-comments/accommodation-comments.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import { AccommodationCommentFormComponent } from './accommodation-comment-form/accommodation-comment-form.component';
import { AccommodationDetailsComponent } from './accommodation-details/accommodation-details.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatInputModule } from '@angular/material/input';
import { AccommodationVerificationComponent } from './accommodation-verification/accommodation-verification.component';
import { RouterModule } from '@angular/router';
import {MatChipsModule} from '@angular/material/chips';

@NgModule({
  declarations: [
    AccommodationImagesComponent,
    AccommodationDescriptionComponent,
    AccommodationReservationComponent,
    AccommodationAmenitiesComponent,
    AccommodationCommentsComponent,
    AccommodationCommentFormComponent,
    AccommodationDetailsComponent,
    AccommodationVerificationComponent
  ],
  imports: [
    CommonModule, MatCardModule, MatDatepickerModule, MatFormFieldModule, MatNativeDateModule, MatSelectModule, MatButtonModule, FlexLayoutModule, GoogleMapsModule, MatInputModule, RouterModule, MatChipsModule
  ],
  exports: [
    AccommodationDetailsComponent
  ]
})
export class AccommodationDetailViewModule { }
