import { Component } from '@angular/core';
import { Input } from '@angular/core';
@Component({
  selector: 'app-accommodation-reservation',
  templateUrl: './accommodation-reservation.component.html',
  styleUrls: ['./accommodation-reservation.component.css']
})
export class AccommodationReservationComponent {
  @Input() price: Number;
  constructor(){
    this.price = 100;
  }
}
