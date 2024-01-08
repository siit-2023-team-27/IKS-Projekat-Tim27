import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Reservation } from '../model/reservation.model';
import { TokenStorage } from 'src/app/infrastructure/auth/jwt/token.service';
import { AccommodationDetailsService } from '../accommodation-details.service';
import { AccommodationDetails } from '../model/accommodationDetails.model';
import {User} from "../../infrastructure/auth/model/user.model";
import {SnackBarComponent} from "../../shared/snack-bar/snack-bar.component";
import {SnackBarService} from "../../shared/snack-bar.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SearchFilterService} from "../../layout/search-filter.service";
@Component({
  selector: 'app-guest-reservations',
  templateUrl: './guest-reservations.component.html',
  styleUrls: ['./guest-reservations.component.css']
})
export class GuestReservationsComponent {
  @Input() reservations: Reservation[]
  isLoaded: boolean = false;
  numQueries: number = 0;

  ngOnInit(){
    this.searchFilterService.reservations$.subscribe(data => {
      this.reservations = data;
      this.loadAccommodations()
    });
  }

  constructor(private searchFilterService:SearchFilterService ,private snackService: SnackBarService, private _snackBar: MatSnackBar,private service: AccommodationDetailsService, private tokenStorage: TokenStorage){
    this.reservations = []
    this.loadReservations()
  }
  loadReservations() : void {
    this.service.getReservationsForGuest(+this.tokenStorage.getId()!).subscribe({
      next: (data: Reservation[]) => {
        this.reservations = data
        this.loadAccommodations()
     },
      error: (_) => {console.log("Greska!")}
    })
  }
  delete(id: number) : void{
    this.service.deleteReservation(id).subscribe({
      next: (_) => {this.loadReservations()}
    });

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
  openSnackBar() {
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: 2000,
    });
    this.snackService.errorMessage$.next("Not possible to cancel")
  }
  cancel(id: number) : void{
    this.service.cancelReservation(id).subscribe({
      next: (_) => {this.loadReservations()},
      error: (_) => {
        this.openSnackBar();
      }
    });

  }
}
