import { Component } from '@angular/core';
import {DateRange, MatCalendarCellCssClasses} from "@angular/material/datepicker";

@Component({
  selector: 'app-accommodation-availability',
  templateUrl: './accommodation-availability.component.html',
  styleUrls: ['./accommodation-availability.component.css']
})
export class AccommodationAvailabilityComponent {

  datesToHighlight : string[] = [];
  dateRange:DateRange<Date>|null =null;

  dateClass(dates: string[]) {
    return (date: Date): MatCalendarCellCssClasses => {
      const highlightDate = dates
        .map(strDate => new Date(strDate))
        .some(d => d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear());

      return highlightDate ? 'special-date' : '';
    };
  }

  onChange(ev: any) {
    console.log("1 ", this.dateRange)
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
      console.log("2 ", this.dateRange);
      this.dateRange =  new DateRange(this.dateRange!.start!, (() => {
        let v = new Date(ev);

        return v;
      })());
    }

  }

  datesOverlap(start: Date, end: Date):boolean{
    for(var date = new Date(start); date < end; date.setDate(date.getDate() + 1)){
      if (this.datesToHighlight.indexOf(date.toDateString()) > -1){
        return true;
      }
    }
    if(end < new Date() || start < new Date()){
      return true;
    }
    return false;
  }

  reset():void{
    this.dateRange = null;
  }

}
