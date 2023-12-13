import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Reservation } from '../model/reservation.model';
import { TokenStorage } from 'src/app/infrastructure/auth/jwt/token.service';
import { AccommodationDetailsService } from '../accommodation-details.service';
import { AccommodationDetails } from '../model/accommodationDetails.model';
@Component({
  selector: 'app-guest-reservations',
  templateUrl: './guest-reservations.component.html',
  styleUrls: ['./guest-reservations.component.css']
})
export class GuestReservationsComponent {
  @Input() reservations: Reservation[]
  isLoaded: boolean = false;
  numQueries: number = 0;
  
  constructor(private service: AccommodationDetailsService, private tokenStorage: TokenStorage){
    this.reservations = []
    this.loadReservations()
  }
  loadReservations() : void {
    this.service.getReservationsForGuest(+this.tokenStorage.getId()!).subscribe({
      next: (data: Reservation[]) => {
        this.reservations = data
        // this.loadAccommodations()
     },
      error: (_) => {console.log("Greska!")}
    })
  }
  // loadAccommodations() : void {
  //   var a = this.reservations.length
  //   for (var res of this.reservations){
  //     this.service.get(res.accommodation).subscribe({
  //       next: (data: AccommodationDetails) => {
  //         res.accommodationDetails = data;
  //         if(++ this.numQueries== this.reservations.length){
  //           this.isLoaded = true;
  //         }
  //      },
  //       error: (_) => {console.log("Greska!")}
  //     })
  //   }
  // }
  delete(id: number) : void{
    this.service.deleteReservation(id).subscribe({
      next: (_) => {this.loadReservations()}
    });
    
  }
}
