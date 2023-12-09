import {Component, Input} from '@angular/core';
import {Amenity} from "../../accommodation-detail-view/model/accommodationDetails.model";

@Component({
  selector: 'app-create-accommodation',
  templateUrl: './create-accommodation.component.html',
  styleUrls: ['./create-accommodation.component.css']
})
export class CreateAccommodationComponent {
  amenities: Amenity[] = []
  constructor(){

  }
}
