import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Accommodation } from 'src/app/accommodation/model/accommodation.model';
import { AccommodationDetails } from '../model/accommodationDetails.model';
@Component({
  selector: 'app-accommodation-description',
  templateUrl: './accommodation-description.component.html',
  styleUrls: ['./accommodation-description.component.css'],

})
export class AccommodationDescriptionComponent {
  @Input() accommodation:AccommodationDetails = {} as AccommodationDetails;

}