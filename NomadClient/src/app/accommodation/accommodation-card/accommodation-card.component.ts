import {ChangeDetectorRef, Component, Input} from '@angular/core';
import { Accommodation } from '../model/accommodation.model';
import {AccommodationSearch} from "../../layout/model/accommodation-search.model";
import {AccommodationDetails} from "../../accommodation-detail-view/model/accommodationDetails.model";
import {FavouriteService} from "../favourite.service";
import {AccountService} from "../../account/account.service";
import {User} from "../../account/model/user.model";

@Component({
  selector: 'app-accommodation-card',
  templateUrl: './accommodation-card.component.html',
  styleUrls: ['./accommodation-card.component.css']
})
export class AccommodationCardComponent {

  @Input() isSearchMode: boolean = false;
  @Input() accommodationSearch: AccommodationSearch = {} as AccommodationSearch;
  @Input() accommodation: AccommodationDetails = {} as AccommodationDetails;
  @Input() user: User = {} as User;

  liked: boolean = false;
  isGuest:boolean = false;

  constructor(private favouriteService: FavouriteService) {
  }

  ngOnInit(): void {

    this.favouriteService.isLiked(this.accommodation.id, this.user.id).subscribe({
      next: (result: boolean) => {
        this.liked = result;
        console.log(result);
      },
      error: () => {
        console.log("Error");
      }
    })

    if (this.user.roles[0] == 'GUEST') {this.isGuest = true; console.log("guest jee ")}
  }

  onLikeClick() {
    this.favouriteService.likeOrDislike(this.accommodation.id, this.user.id).subscribe({
      next: (result:boolean) => {
        this.liked = result;
      },
      error: () => { console.log("Error"); }
    })
  }
}
