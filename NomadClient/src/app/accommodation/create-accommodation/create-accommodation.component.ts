import {Component, Input} from '@angular/core';
import {AmenityService} from "../../amenity/amenity.service";
import {Amenity} from "../../amenity/amenity.model";

@Component({
  selector: 'app-create-accommodation',
  templateUrl: './create-accommodation.component.html',
  styleUrls: ['./create-accommodation.component.css']
})
export class CreateAccommodationComponent {
  amenities: Amenity[] = []
  constructor(private amenityService: AmenityService){}

  ngOnInit(): void {
    this.amenityService.getAll().subscribe({
      next: (data: Amenity[]) => {this.amenities = data; },
      error: () => { console.log("Error while reading amenities! ") }
    })
  }
}
