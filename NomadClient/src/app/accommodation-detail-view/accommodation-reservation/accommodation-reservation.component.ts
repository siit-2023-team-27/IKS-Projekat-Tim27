import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { DateRange, MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { AccommodationDetailsService } from '../accommodation-details.service';
import { Reservation } from '../model/reservation.model';
@Component({
  selector: 'app-accommodation-reservation',
  templateUrl: './accommodation-reservation.component.html',
  styleUrls: ['./accommodation-reservation.component.css']
})
export class AccommodationReservationComponent implements OnInit{
  @Input() id?: number;
  datesToHighlight : string[];
  dates : Date[];
  dateRange:DateRange<Date>|null;
  price: number = 0;
  constructor(private service: AccommodationDetailsService){
    this.id = 1;
    this.datesToHighlight = []
    this.dates = []
    this.dateRange = null;
  }
  ngOnInit(): void {
    this.loadDates()
    
  }
  dateClass() {
    return (date: Date): MatCalendarCellCssClasses => {
      const highlightDate = this.datesToHighlight
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
      "user" : 5,
    "accommodation" : this.id!,
    "startDate" : this.dateRange!.start!,
    "finishDate" : this.dateRange!.end!,
    "numGuests" : 5,
    "status" : "PENDING"
    }).subscribe({
      next: (data:Reservation) => {console.log(data)},
      error: (a) => {console.log(a)}
    })
    this.loadDates();
  }
  loadDates():void{
    this.service.getTakenDates(this.id).subscribe({
      next: (data: string[]) => {
        this.datesToHighlight = data.map(date => {return new Date(date).toDateString()});
     },
      error: (_) => {console.log("Greska!")}
    })
  }
  myFilter = (d: Date | null): boolean => {
    const date = (d || new Date()).toDateString();
    // Prevent Saturday and Sunday from being selected.
    return (this.datesToHighlight.indexOf(date) > -1);
  };
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
  return false;
 }
}
