import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {AmenityService} from "../../amenity/amenity.service";
import {Amenity} from "../../amenity/amenity.model";
import {Accommodation} from "../model/accommodation.model";
import {AccommodationService} from "../accommodation.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-accommodation',
  templateUrl: './create-accommodation.component.html',
  styleUrls: ['./create-accommodation.component.css']
})
export class CreateAccommodationComponent {
  amenities: Amenity[] = []
  selectedImages: string[] = [];

  images: string[] = [];
  name:string = "";
  description: string = ""
  minGuest: number = 1;
  maxGuest: number = 1;
  location: string = "";
  checkedAmenities:Amenity[] = [];

  isConformationVisible: boolean = false;

  constructor(private amenityService: AmenityService,
              private accommodationService: AccommodationService,
              private router: Router){}

  ngOnInit(): void {
    this.amenityService.getAll().subscribe({
      next: (data: Amenity[]) => {this.amenities = data; },
      error: () => { console.log("Error while reading amenities! ") }
    })
  }

  getCurrentLocation(currentLocation: string) {
    this.location = currentLocation;
  }

  onFileSelected(event: any) {
    const file:File = event.target.files[0];
    this.images.push(file.name);

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        // @ts-ignore
        this.selectedImages.push(e.target.result as string);
      };

      reader.readAsDataURL(file);
    }
  }

  saveAcoommodation(): void {

    if(!this.validateFields()) {return;}

    this.getCheckedAmenities();

    this.isConformationVisible = true;
  }

  validateFields(): boolean {
    if(this.name == "" || this.description == ""){
      alert("Make sure you have filled in all the fields!")
      return false;
    }
    if(this.location == "") {
      alert("Please click on the search icon to confirm location!")
      return false;
    }

    if(this.images.length <= 0) {
      alert("Please select at least one photo!");
      return false;
    }
    return true;
  }

  isChecked(amenity: Amenity, checkedBoxes: HTMLInputElement[]): boolean {
    for (const box of checkedBoxes) {
      if (box.id == amenity.id.toString()) {
        return true;
      }
    }
    return false;
  }

  getCheckedAmenities(): void {
    const checkBoxes = Array.from(document.getElementsByName("checkbox")) as HTMLInputElement[];
    const checkedBoxes = checkBoxes.filter(checkBox => checkBox.checked);
    this.checkedAmenities = this.amenities.filter(a => this.isChecked(a, checkedBoxes) );
    console.log(this.checkedAmenities);
  }

  confirm(): void {

    let newAccommodation: Accommodation = {
      id:0,
      name: this.name,
      description: this.description,
      address: this.location,
      minGuests: this.minGuest,
      maxGuests: this.maxGuest,
      amenities: this.checkedAmenities,
      images: this.images,
      comments: [],
      status: "REJECTED",
    }

    this.accommodationService.post(newAccommodation).subscribe({
      next: (accommodation) => {
        console.log("Success!");
        console.log("New accommodation is created: ", accommodation);

        alert("New accommodation is created. Thank you for submiting.");
        this.router.navigate(['/home']);

      },
      error: () => {console.log("Error while posting new accommocation!!");}
    })

  }

  cancel(): void {
    this.isConformationVisible = false;
  }

}


