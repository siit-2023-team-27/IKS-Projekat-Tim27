import {Component, OnInit} from '@angular/core';
import {Accommodation} from "../model/accommodation.model";
import {AccommodationService} from "../accommodation.service";

@Component({
  selector: 'app-accommodation-cards',
  templateUrl: './accommodation-cards.component.html',
  styleUrls: ['./accommodation-cards.component.css']
})
export class AccommodationCardsComponent implements OnInit{
  accommodations: Accommodation[] = [];

  constructor(private service: AccommodationService) {
  }

  ngOnInit(): void {

    this.service.getAll().subscribe({
      next: (data: Accommodation[]) => { this.accommodations = data; },
      error: () => { console.log("Error while reading accommodations!"); }
    })
  }
}

