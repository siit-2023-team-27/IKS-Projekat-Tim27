import { Component, Input } from '@angular/core';
import { Accommodation } from '../model/accommodation.model';
import {AccommodationSearch} from "../../layout/model/accommodation-search.model";
import {AccommodationDetails} from "../../accommodation-detail-view/model/accommodationDetails.model";

@Component({
  selector: 'app-accommodation-card',
  templateUrl: './accommodation-card.component.html',
  styleUrls: ['./accommodation-card.component.css']
})
export class AccommodationCardComponent {

  @Input() isSearchMode: boolean = false;
  @Input() accommodationSearch: AccommodationSearch = {} as AccommodationSearch;
  @Input() accommodation: AccommodationDetails = {} as AccommodationDetails;
}
