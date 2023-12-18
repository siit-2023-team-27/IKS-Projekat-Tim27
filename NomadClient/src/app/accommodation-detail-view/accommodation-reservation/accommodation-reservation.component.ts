import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { DateRange, MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { AccommodationDetailsService } from '../accommodation-details.service';
import { Reservation } from '../model/reservation.model';
import { AccommodationDetails } from '../model/accommodationDetails.model';
import { TokenStorage } from 'src/app/infrastructure/auth/jwt/token.service';
import { MatCalendar } from '@angular/material/datepicker';
import { ViewChild } from '@angular/core';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { ChangeDetectorRef } from '@angular/core';
import { CdkTrapFocus } from '@angular/cdk/a11y';
@Component({
  selector: 'app-accommodation-reservation',
  templateUrl: './accommodation-reservation.component.html',
  styleUrls: ['./accommodation-reservation.component.css']
})
export class AccommodationReservationComponent implements OnInit{
  @Input() id?: number;
  @Input() accommodation!: AccommodationDetails;
  datesToHighlight : string[];
  dates : Date[];
  dateRange:DateRange<Date>|null;
  price: number = 0;
  guests: number = 0;
  @ViewChild(MatCalendar, {static: false}) calendar!: MatCalendar<Date>;

  constructor(private service: AccommodationDetailsService, private tokenStorage:TokenStorage, private cdr: ChangeDetectorRef){
    this.id = 1;
    this.datesToHighlight = []
    this.dates = []
    this.dateRange = null;
  }
  ngOnInit(): void {
    this.loadDates()
  }
  dateClass(dates: string[]) {
    return (date: Date): MatCalendarCellCssClasses => {
      const highlightDate = dates
        .map(strDate => new Date(strDate))
        .some(d => d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear());

      return highlightDate ? 'special-date' : '';
    };
  }
  onSelect(){}
  reset():void{
    this.dateRange = null;
  }
  reserve():void{
    this.service.reserve({
      "user" : +this.tokenStorage.getId()!,
    "accommodation" : this.id!,
    "startDate" : this.dateRange!.start!,
    "finishDate" : this.dateRange!.end!,
    "numGuests" : this.guests,
    "status" : "PENDING"
    }).subscribe({
      next: (data:Reservation) => {console.log(data)},
      error: (a) => {console.log(a)}
    })
    this.loadDates();
    this.calendar.dateClass = this.dateClass(this.datesToHighlight);
    this.cdr.detectChanges();

  }
  loadDates():void{
    this.service.getTakenDates(this.id).subscribe({
      next: (data: string[]) => {
        this.datesToHighlight = data.map(date => {return new Date(date).toDateString()});
     },
      error: (_) => {console.log("Greska!")}
    })
  }
  onChange(ev: any) {
    let v = new Date(ev);
    if(this.dateRange == null){
      this.dateRange =  new DateRange((() => {
        let v = new Date(ev);

        return v;
      })(), v);
    }else if(v > this.dateRange!.start!){
      if (this.datesOverlap(this.dateRange.start!, v)){
        this.dateRange = null;
      }
      this.dateRange =  new DateRange(this.dateRange!.start!, (() => {
        let v = new Date(ev);

        return v;
      })());
    }

  }
 datesOverlap(start: Date, end: Date):boolean{
  this.price = 0
  for(var date = new Date(start); date < end; date.setDate(date.getDate() + 1)){
    this.service.getPrice(this.id!,date.toDateString()).subscribe({
      next: (data: number) => {
        this.price += data
     },
      error: (_) => {console.log("Greska!")}
    })
    if (this.datesToHighlight.indexOf(date.toDateString()) > -1){
      return true;
    }

  }
  if(end < new Date() || start < new Date()){
    return true;
  }
  return false;
 }
}
