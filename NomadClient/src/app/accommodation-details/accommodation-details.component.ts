import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Accommodation } from '../model/accommodation.model';
import {MatGridListModule} from '@angular/material/grid-list';
import {CommonModule} from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider'
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatDatepickerModule} from "@angular/material/datepicker"
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faWifi } from '@fortawesome/free-solid-svg-icons';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-accommodation-details',
  templateUrl: './accommodation-details.component.html',
  styleUrls: ['./accommodation-details.component.css'],
  imports : [MatGridListModule, CommonModule, MatCardModule, MatDividerModule, FlexLayoutModule, MatDatepickerModule, MatFormFieldModule, MatNativeDateModule, MatSelectModule, MatButtonModule, FontAwesomeModule,
     MatInputModule],
  standalone:true
  
})

export class AccommodationDetailsComponent implements OnInit{
  
  @Input() accommodation: Accommodation;
  @Input() accommodations: Accommodation[];
  faWifi
  faStar
	constructor() {
    this.faWifi = faWifi
    this.faStar = faStar;
    this.accommodation =  {_id : 0, description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    , name : "bla", rating : 4.9, price : 100, images: ["https://tecdn.b-cdn.net/img/new/standard/nature/184.jpg", "https://tecdn.b-cdn.net/img/new/standard/nature/184.jpg"
  ,"https://tecdn.b-cdn.net/img/new/standard/nature/184.jpg", "https://tecdn.b-cdn.net/img/new/standard/nature/184.jpg", "https://tecdn.b-cdn.net/img/new/standard/nature/184.jpg"],
    amenities : [{_id:0, name: "wifi", icon: "faStarHalfStroke"},{_id:0, name: "wifi", icon: "faStarHalfStroke"}, {_id:0, name: "wifi", icon: "faStarHalfStroke"},{_id:0, name: "wifi", icon: "faStarHalfStroke"},
  {_id:0, name: "wifi", icon: "faStarHalfStroke"},{_id:0, name: "wifi", icon: "faStarHalfStroke"},{_id:0, name: "wifi", icon: "faStarHalfStroke"},{_id:0, name: "wifi", icon: "faStarHalfStroke"},
  {_id:0, name: "wifi", icon: "faStarHalfStroke"},{_id:0, name: "wifi", icon: "faStarHalfStroke"}],
  reviews : [{name:"Neko", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco", rating: 3.5, _id: 0},
  {name:"Neko", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco", rating: 3.5, _id: 0}]}
  this.accommodations = [
    {_id : 0, description : "bla bla", name : "bla", rating : 4.9, price : 100, images: ["https://tecdn.b-cdn.net/img/new/standard/nature/184.jpg"], amenities : [{_id:0, name: "wifi", icon: "faStarHalfStroke"}]},
    {_id : 0, description : "bla bla", name : "bla", rating : 4.9, price : 100, images: ["https://tecdn.b-cdn.net/img/new/standard/nature/184.jpg"], amenities : [{_id:0, name: "wifi", icon: "faStarHalfStroke"}]},
    {_id : 0, description : "bla bla", name : "bla", rating : 4.9, price : 100, images: ["https://tecdn.b-cdn.net/img/new/standard/nature/184.jpg"], amenities : [{_id:0, name: "wifi", icon: "faStarHalfStroke"}]},
    {_id : 0, description : "bla bla", name : "bla", rating : 4.9, price : 100, images: ["https://tecdn.b-cdn.net/img/new/standard/nature/184.jpg"], amenities : [{_id:0, name: "wifi", icon: "faStarHalfStroke"}]}
  ]
  }
  ngOnInit() {
   
  }
  numSequence(n: number): Array<number> { 
    return Array(Math.floor(n)); 
  } 
}
