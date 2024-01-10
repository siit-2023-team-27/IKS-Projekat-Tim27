import {Component, OnInit} from '@angular/core';
import { Accommodation } from '../model/accommodation.model';
import {AccommodationService} from "../accommodation.service";
import {SearchFilterService} from "../../layout/search-filter.service";
import {AccommodationSearch} from "../../layout/model/accommodation-search.model";
import {AccommodationDetails} from "../../accommodation-detail-view/model/accommodationDetails.model";
import {SearchFilterForm} from "../../layout/model/searchFilterForm.model";
import {User} from "../../account/model/user.model";
import {AccountService} from "../../account/account.service";

@Component({
  selector: 'app-accommodation-cards',
  templateUrl: './accommodation-cards.component.html',
  styleUrls: ['./accommodation-cards.component.css']
})
export class AccommodationCardsComponent implements OnInit{
  accommodations: AccommodationDetails[] = [];
  peopleNum: number = -1;
  accommodationsSearch: AccommodationSearch[] = [];

  searchFilterForm: SearchFilterForm = {
    city: '',
    startDate: '',
    finishDate: '',
    peopleNum:-1,
    amenities: [],
    minPrice:-1,
    maxPrice:-1,
    accommodationType:''
  };

  user:User = {} as User;

  constructor(private searchFilterService: SearchFilterService,
              private service: AccommodationService,
              private searchService: SearchFilterService,
              private accountService: AccountService) {
  }

  ngOnInit(): void {

    this.accountService.getLoggedUser().subscribe({
      next: (data: User) => { this.user = data; },
      error: () => { console.log("Error while reading logged user!"); }
    })

    this.service.getVerifiedAccommodations().subscribe({
      next: (data: AccommodationDetails[]) => { this.accommodations = data; this.accommodationsSearch = [];},
      error: () => { console.log("Error while reading accommodations!"); }
    })
    this.searchService.accommodations$.subscribe(data => {
      this.accommodations = [];
      this.accommodationsSearch = data;
    });
    this.searchService.accommodationsFilter$.subscribe(data => {
      this.accommodations = data;
      this.accommodationsSearch = [];
    });
    this.searchFilterService.searchFilterForm$.subscribe(data => {
      this.searchFilterForm = data;
    });
  }
}

