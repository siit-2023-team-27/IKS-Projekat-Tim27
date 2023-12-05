import { Component } from '@angular/core';
import { Input } from '@angular/core';
@Component({
  selector: 'app-accommodation-description',
  templateUrl: './accommodation-description.component.html',
  styleUrls: ['./accommodation-description.component.css'],

})
export class AccommodationDescriptionComponent {
  @Input() description:String = "";

}