import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { AccommodationDetails } from '../model/accommodationDetails.model';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faWifi } from '@fortawesome/free-solid-svg-icons';
import { AccommodationDetailsService } from '../accommodation-details.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-accommodation-details',
  templateUrl: './accommodation-details.component.html',
  styleUrls: ['./accommodation-details.component.css']
  
})

export class AccommodationDetailsComponent implements OnInit{
  
  @Input() accommodation: AccommodationDetails;
  id?:number;
  // @ViewChild(google.maps.Map, { static: false }) map!: google.maps.Map;
  faWifi
  faStar
	constructor(private service: AccommodationDetailsService, private route: ActivatedRoute) {
    this.faWifi = faWifi
    this.faStar = faStar;
    this.accommodation =  {address: "address", minGuests: 0, maxGuests: 1, status: "a", id : 0, description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    , name : "bla", rating : 4.9, images: ["https://tecdn.b-cdn.net/img/new/standard/nature/184.jpg", "https://tecdn.b-cdn.net/img/new/standard/nature/184.jpg"
  ,"https://tecdn.b-cdn.net/img/new/standard/nature/184.jpg", "https://tecdn.b-cdn.net/img/new/standard/nature/184.jpg", "https://tecdn.b-cdn.net/img/new/standard/nature/184.jpg"],
    amenities : [{_id:0, name: "wifi", icon: "faStarHalfStroke"},{_id:0, name: "wifi", icon: "faStarHalfStroke"}, {_id:0, name: "wifi", icon: "faStarHalfStroke"},{_id:0, name: "wifi", icon: "faStarHalfStroke"},
  {_id:0, name: "wifi", icon: "faStarHalfStroke"},{_id:0, name: "wifi", icon: "faStarHalfStroke"},{_id:0, name: "wifi", icon: "faStarHalfStroke"},{_id:0, name: "wifi", icon: "faStarHalfStroke"},
  {_id:0, name: "wifi", icon: "faStarHalfStroke"},{_id:0, name: "wifi", icon: "faStarHalfStroke"}],
  comments : [{name:"Neko", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco", rating: 3.5, _id: 0},
  {name:"Neko", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco", rating: 3.5, _id: 0}]}
  
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.service.get(this.id).subscribe({
        next: (data: AccommodationDetails) => {
          this.accommodation = data;
       },
        error: (_) => {console.log("Greska!")}
      })
   });
    
  }
   
}
