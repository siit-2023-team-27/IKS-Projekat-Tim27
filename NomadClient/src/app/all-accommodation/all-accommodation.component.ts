import { Component, OnInit, Input  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Accommodation } from '../model/accommodation.model';
import {FlexLayoutModule} from "@angular/flex-layout";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-all-accommodation',
  templateUrl: './all-accommodation.component.html',
  styleUrls: ['./all-accommodation.component.css'],
  imports: [MatCardModule, CommonModule, FlexLayoutModule, FontAwesomeModule],
  standalone:true
})
export class AllAccommodationComponent implements OnInit {
  @Input() accommodations: Accommodation[];
  faStarHalfStroke = faStarHalfStroke
	constructor() {
    this.accommodations = [
      {_id : 0, description : "bla bla", name : "bla", rating : 4.9, price : 100},
      {_id : 1, description : "bla bla", name : "bla", rating : 4.9, price : 100},
      {_id : 2, description : "bla bla", name : "bla", rating : 4.9, price : 100},
      {_id : 3, description : "bla bla", name : "bla", rating : 4.9, price : 100}
    ]
  }

	ngOnInit() {}
}
