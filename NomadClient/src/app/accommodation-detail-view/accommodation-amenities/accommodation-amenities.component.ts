import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Amenity } from 'src/app/accommodation-detail-view/model/accommodationDetails.model';
@Component({
  selector: 'app-accommodation-amenities',
  templateUrl: './accommodation-amenities.component.html',
  styleUrls: ['./accommodation-amenities.component.css']
})
export class AccommodationAmenitiesComponent {
  @Input() amenities: Amenity[];
  constructor(){
    this.amenities = [];
  }
}
