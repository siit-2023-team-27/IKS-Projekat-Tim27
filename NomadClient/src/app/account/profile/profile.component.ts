import {Component, Input} from '@angular/core';
import {User} from "../model/user.model";
import {AccommodationService} from "../../accommodation/accommodation.service";
import {Accommodation} from "../../accommodation/model/accommodation.model";
import {AccountService} from "../account.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  @Input() user: User = {} as User;
  isEditMode:boolean=false;
  constructor(private service: AccountService) {
  }
  turnEditMode(){
    this.isEditMode = true;
  }
  exitEditMode(){
    this.isEditMode = false;
  }
  ngOnInit(): void {
    this.service.getLoggedUser().subscribe({
      next: (data: User) => { this.user = data; },
      error: () => { console.log("Error while reading logged user!"); }
    })
  }
}
