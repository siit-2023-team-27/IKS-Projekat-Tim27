import {Component, Input} from '@angular/core';
import {User} from "../model/user.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  @Input() user: User = {} as User;
}
