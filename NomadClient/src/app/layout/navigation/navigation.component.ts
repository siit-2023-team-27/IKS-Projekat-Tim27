import { Component } from '@angular/core';
import {faPersonWalkingLuggage} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  faPersonWalkingLuggage = faPersonWalkingLuggage;
}
