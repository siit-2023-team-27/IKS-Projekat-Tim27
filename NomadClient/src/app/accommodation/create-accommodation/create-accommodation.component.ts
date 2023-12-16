import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {AmenityService} from "../../amenity/amenity.service";
import {Amenity} from "../../amenity/amenity.model";
import {Accommodation} from "../model/accommodation.model";
import {AccommodationService} from "../accommodation.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AccommodationDetails} from "../../accommodation-detail-view/model/accommodationDetails.model";
import {TokenStorage} from "../../infrastructure/auth/jwt/token.service";

@Component({
  selector: 'app-create-accommodation',
  templateUrl: './create-accommodation.component.html',
  styleUrls: ['./create-accommodation.component.css']
})
export class CreateAccommodationComponent {

  accommodation:AccommodationDetails | undefined;

  amenities: Amenity[] = []

  accommodaitonImages: string[] = [];

  images: string[] = [];
  name:string = "";
  description: string = ""
  minGuest: number = 1;
  maxGuest: number = 1;
  location: string = "";
  checkedAmenities:Amenity[] = [];

  isConformationVisible: boolean = false;

  edit: boolean = false;

  id?:number;

  constructor(private amenityService: AmenityService,
              private accommodationService: AccommodationService,
              private router: Router,
              private route: ActivatedRoute,
              private tokenStorage: TokenStorage){}

  ngOnInit(): void {
    this.amenityService.getAll().subscribe({
      next: (data: Amenity[]) => {this.amenities = data; },
      error: () => { console.log("Error while reading amenities! ") }
    })

    this.route.params.subscribe(params => {
      this.id = +params['id'];
      if(this.id) {
        this.edit = true;
        this.accommodationService.get(this.id).subscribe({
          next: (data: AccommodationDetails) => {
            this.accommodation = data;
            this.initializeFields();
          },
          error: (_) => {}
        })
      }

    });
  }

  initializeFields(): void {
    if(this.accommodation) {
      this.name = this.accommodation.name;
      this.description = this.accommodation.description;
      this.location = this.accommodation.address;

      this.minGuest = this.accommodation.minGuests;
      this.maxGuest = this.accommodation.maxGuests;
      this.accommodaitonImages = this.accommodation.images;
      this.accommodaitonImages = this.accommodaitonImages.map(i => i = "images/"+i);
      this.checkedAmenities = this.accommodation.amenities;
      const checkBoxes = Array.from(document.getElementsByName("checkbox")) as HTMLInputElement[];
      checkBoxes.map(box => {
        if (this.contains(parseInt(box.id), this.checkedAmenities)){
          box.checked = true
        }
      })
    }
  }

  getImages(selectedImages: string[]) {
    this.images = selectedImages;
  }

  contains(id:number, amenities: Amenity[]): boolean {
    for(const amenity of amenities){
      if(id == amenity.id) { return  true; }
    }
    return false;
  }

  getCurrentLocation(currentLocation: string) {
    this.location = currentLocation;
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
    if(this.accommodation) {
      this.updateAccommodation();
    }else{
      this.createAccommodation();
    }
  }

  cancel(): void {
    this.isConformationVisible = false;
  }

  createAccommodation() {
    let newAccommodation: AccommodationDetails = {
      id:0,
      hostId: +this.tokenStorage.getId()!,
      name: this.name,
      description: this.description,
      address: this.location,
      minGuests: this.minGuest,
      maxGuests: this.maxGuest,
      amenities: this.checkedAmenities,
      images: this.images,
      comments: [],
      status: "PENDING",
      rating: 0
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

  updateAccommodation() {
    if(this.accommodation) {
      this.accommodation.name = this.name;
      this.accommodation.description = this.description;
      this.accommodation.address = this.location;
      this.accommodation.minGuests = this.minGuest;
      this.accommodation.maxGuests = this.maxGuest;
      this.accommodation.amenities = this.checkedAmenities;
      this.accommodation.images = this.images;

      this.accommodationService.put(this.accommodation.id, this.accommodation).subscribe({
        next: (accommodation) => {
          console.log("Success!");
          console.log("Accommodation is updated: ", accommodation);

          alert("Accommodation is updated. Thank you for submiting.");
          this.router.navigate(['/home']);

        },
        error: () => {console.log("Error while posting new accommocation!!");}
      })
    }

  }

}


