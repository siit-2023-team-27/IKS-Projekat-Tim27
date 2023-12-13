import {Component, OnInit} from '@angular/core';
import { Accommodation } from '../model/accommodation.model';
import {AccommodationService} from "../accommodation.service";
import {SearchFilterService} from "../../layout/search-filter.service";
import {AccommodationSearch} from "../../layout/model/accommodation-search.model";

@Component({
  selector: 'app-accommodation-cards',
  templateUrl: './accommodation-cards.component.html',
  styleUrls: ['./accommodation-cards.component.css']
})
export class AccommodationCardsComponent implements OnInit{
  accommodations: Accommodation[] = [];
  accommodationsSearch: AccommodationSearch[] = [];
  constructor(private service: AccommodationService, private searchService: SearchFilterService ) {
  }

  ngOnInit(): void {

    this.service.getAll().subscribe({
      next: (data: Accommodation[]) => { this.accommodations = data; this.accommodationsSearch = [];},
      error: () => { console.log("Error while reading accommodations!"); }
    })
    this.searchService.accommodations$.subscribe(data => {
      this.accommodations = [];
      this.accommodationsSearch = data;
    });
  }
}

