import { TestBed } from '@angular/core/testing';

import { AccommodationDetailsService } from './accommodation-details.service';
import {FormsModule} from "@angular/forms";
import {AccommodationReservationComponent} from "./accommodation-reservation/accommodation-reservation.component";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {Reservation} from "./model/reservation.model";

describe('AccommodationDetailsService', () => {
  let service: AccommodationDetailsService;
  let httpController: HttpTestingController;
  let url = "http://localhost:8080/api";

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(AccommodationDetailsService);
    httpController = TestBed.inject(HttpTestingController);
  });
  afterEach(()=>{
    httpController.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should call reserve and return created Reservation', () => {
    const mockReservation:Reservation = {
      accommodation: 0,
      finishDate: new Date(),
      id: 0,
      numGuests: 0,
      startDate: new Date(),
      status: "",
      user: 0
    }
    service.reserve(mockReservation).subscribe((res)=>{
      expect(res).toEqual(mockReservation);
    })
    const req = httpController.expectOne({
      method:"POST",
      url:url+"/reservations"
      });
    req.flush(mockReservation)
  });

});
