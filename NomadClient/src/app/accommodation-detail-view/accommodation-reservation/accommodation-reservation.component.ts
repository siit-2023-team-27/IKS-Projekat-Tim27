import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { AccommodationDetailsService } from '../accommodation-details.service';
@Component({
  selector: 'app-accommodation-reservation',
  templateUrl: './accommodation-reservation.component.html',
  styleUrls: ['./accommodation-reservation.component.css']
})
export class AccommodationReservationComponent implements OnInit{
  @Input() id?: number;
  datesToHighlight : string[];

  constructor(private service: AccommodationDetailsService){
    this.id = 1;
    this.datesToHighlight = ["2023-12-22T18:30:00.000Z", "2019-01-22T18:30:00.000Z", "2019-01-24T18:30:00.000Z", "2019-01-28T18:30:00.000Z", "2019-01-24T18:30:00.000Z", "2019-01-23T18:30:00.000Z", "2019-01-22T18:30:00.000Z", "2019-01-25T18:30:00.000Z"]
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
  loadDates():void{
    this.service.getTakenDates(this.id).subscribe({
      next: (data: string[]) => {
        this.datesToHighlight = data;
     },
      error: (_) => {console.log("Greska!")}
    })
  }
}
