import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {AmenityService} from "../../amenity/amenity.service";
import {Amenity} from "../../amenity/amenity.model";

@Component({
  selector: 'app-create-accommodation',
  templateUrl: './create-accommodation.component.html',
  styleUrls: ['./create-accommodation.component.css']
})
export class CreateAccommodationComponent {
  amenities: Amenity[] = []
  selectedImages: string[] = [];

  constructor(private amenityService: AmenityService){}

  ngOnInit(): void {
    this.amenityService.getAll().subscribe({
      next: (data: Amenity[]) => {this.amenities = data; },
      error: () => { console.log("Error while reading amenities! ") }
    })
  }

  onFileSelected(event: any) {
    const file:File = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        // @ts-ignore
        this.selectedImages.push(e.target.result as string);
      };

      reader.readAsDataURL(file);
    }
  }
}
