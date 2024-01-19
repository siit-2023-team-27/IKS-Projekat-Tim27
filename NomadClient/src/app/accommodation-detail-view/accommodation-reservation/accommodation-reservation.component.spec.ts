import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationReservationComponent } from './accommodation-reservation.component';
import {FormsModule} from "@angular/forms";
import {AccommodationDetailsService} from "../accommodation-details.service";
import {Observable, of, take} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MaterialModule} from "../../infrastructure/material/material.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TokenStorage} from "../../infrastructure/auth/jwt/token.service";
import {AccommodationDetails, Review} from "../model/accommodationDetails.model";
import {Amenity} from "../../amenity/amenity.model";
import {User} from "../../account/model/user.model";
import {Reservation} from "../model/reservation.model";

describe('AccommodationReservationComponent', () => {
  let component: AccommodationReservationComponent;
  let fixture: ComponentFixture<AccommodationReservationComponent>;
  let reservationService: AccommodationDetailsService;
  let httpTestingController: HttpTestingController;
  let tokenStorage:TokenStorage;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[FormsModule, HttpClientTestingModule, MatSnackBarModule, MaterialModule, BrowserAnimationsModule],
      providers: [AccommodationDetailsService],
      declarations: [AccommodationReservationComponent]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccommodationReservationComponent);
    component = fixture.componentInstance;
    reservationService = TestBed.inject(AccommodationDetailsService);
    httpTestingController = TestBed.inject(HttpTestingController);
    tokenStorage = TestBed.inject(TokenStorage);

  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it("should load taken dates asynchronously", async () => {
    const dates = ["2024-07-21"];
    const datesToHighlight = ['Sun Jul 21 2024']
    let spy = spyOn(reservationService, "getTakenDates").and.returnValue(of(dates));
    component.loadDates();
    fixture.whenStable().then(() => {
      expect(component.datesToHighlight).toEqual(datesToHighlight);
    });
  });
  it("reservation form should be invalid", async () => {
    component.reserve();
    spyOn(reservationService, "reserve");
    expect(reservationService.reserve).toHaveBeenCalledTimes(0);
  });
  it("reservation form should be invalid because end date is not entered", async () => {
    component.onChange(new Date(2024, 1,1));
    component.guests = 1;
    component.id = 1;
    component.userId = () => {
      return '1';
    };
    expect(component.invalid).toBeTruthy();
    component.reserve();
    spyOn(reservationService, "reserve");
    expect(reservationService.reserve).toHaveBeenCalledTimes(0);
  });
  it("reservation form should be invalid because date is in the past", async () => {
    let startDate = new Date(2024, 0,1)
    let endDate = new Date(2024, 2,1)
    component.onChange(startDate);
    component.onChange(endDate);
    component.guests = 1;
    component.id = 1;
    component.userId = () => {
      return '1';
    };
    spyOn(reservationService, "getPrice").and.returnValue(of(200));
    component.reserve();
    expect(component.invalid).toBeTruthy();
    spyOn(reservationService, "reserve");
    expect(reservationService.reserve).toHaveBeenCalledTimes(0);
  });
  it("reservation form should be invalid because end date is before start", async () => {
    let startDate = new Date(2024, 2,2);
    let endDate = new Date(2024, 2,1);
    component.onChange(startDate);
    component.onChange(endDate);
    component.guests = 1;
    component.id = 1;
    component.userId = () => {
      return '1';
    };
    spyOn(reservationService, "getPrice").and.returnValue(of(200));
    component.reserve();
    expect(component.invalid).toBeTruthy();
    spyOn(reservationService, "reserve");
    expect(reservationService.reserve).toHaveBeenCalledTimes(0);
  });
  it("reservation form should be invalid because number of guests is 0", async () => {
    component.onChange(new Date(2024, 2,2));
    component.onChange(new Date(2024, 2,5));
    component.guests = 0;
    component.id = 1;
    component.userId = () => {
      return '1';
    };
    spyOn(reservationService, "getPrice").and.returnValue(of(200));
    component.reserve();
    expect(component.invalid).toBeTruthy();
    spyOn(reservationService, "reserve");
    expect(reservationService.reserve).toHaveBeenCalledTimes(0);
  });
  it("reservation form should be valid", async () => {
    component.accommodation = {
      status: "ACCEPTED",
      id:1,
      hostId: 1,
      name: "motel",
      description: "fine place",
      address: "adress",
      minGuests: 1,
      maxGuests: 4,
      amenities: [],
      images: [],
      ratings: [],
      verified: true,
      accommodationType: "type1",
      defaultPrice: 200,
      priceType: "type2",
      confirmationType: "type3",
      deadlineForCancellation: 3
    }
    fixture.detectChanges();
    component.onChange(new Date(2024, 2,2));
    component.onChange(new Date(2024, 2,5));
    component.guests = 1;
    component.id = 1;
    component.userId = () => {
      return '1';
    };
    let reservation: Reservation =
      { id : 1,
      user : 1,
      accommodation : 1,
      startDate : new Date(),
      finishDate : new Date(),
      numGuests : 1,
      status : "st",
    }
    spyOn(reservationService, "reserve").and.returnValue(of(reservation));
    component.reserve();

    fixture.whenStable().then(() => {
      expect(reservationService.reserve).toEqual(reservation);
    });
  });
});
