import { Component, Input } from '@angular/core';
import { Reservation } from '../model/reservation.model';
import { Accommodation } from 'src/app/accommodation/model/accommodation.model';
import { AccommodationDetailsService } from '../accommodation-details.service';
import { AccommodationDetails } from '../model/accommodationDetails.model';
import { TokenStorage } from 'src/app/infrastructure/auth/jwt/token.service';
import {SearchFilterService} from "../../layout/search-filter.service";

@Component({
  selector: 'app-reservation-verification',
  templateUrl: './reservation-verification.component.html',
  styleUrls: ['./reservation-verification.component.css']
})
export class ReservationVerificationComponent {
  @Input() reservations: Reservation[]

  constructor(private searchFilterService:SearchFilterService ,private service: AccommodationDetailsService, private tokenStorage: TokenStorage){
    this.reservations = []
    this.loadReservations()
  }
  ngOnInit(){
    this.searchFilterService.reservations$.subscribe(data => {
      this.reservations = data;
      this.loadAccommodations()
    });
  }
  loadReservations() : void {
    this.service.getReservationsForUser(+this.tokenStorage.getId()!).subscribe({
      next: (data: Reservation[]) => {
        this.reservations = data
        this.loadAccommodations()
     },
      error: (_) => {console.log("Greska!")}
    })
  }
  loadAccommodations() : void {
    for (let res of this.reservations){
      this.service.getAccommodation(res.accommodation).subscribe({
        next: (data: AccommodationDetails) => {
          res.accommodationDetails = data;
       },
        error: (_) => {console.log("Greska!")}
      })
    }
  }
  accept(id: number) : void{
    this.service.confirmReservation(id).subscribe({
      next: (_) => {this.loadReservations()}
    });
  }
  deny(id: number) : void{
    this.service.rejectReservation(id).subscribe({
      next: (_) => {this.loadReservations()}
    });
  }
}
