import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import {DateRange, MatCalendar, MatCalendarCellCssClasses} from "@angular/material/datepicker";
import {AccommodationDetailsService} from "../../accommodation-detail-view/accommodation-details.service";
import {DatePipe} from "@angular/common";
import {SnackBarService} from "../../shared/snack-bar.service";
import {SnackBarComponent} from "../../shared/snack-bar/snack-bar.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Accommodation} from "../model/accommodation.model";
import {AccommodationDetails} from "../../accommodation-detail-view/model/accommodationDetails.model";

@Component({
  selector: 'app-accommodation-availability',
  templateUrl: './accommodation-availability.component.html',
  styleUrls: ['./accommodation-availability.component.css']
})
export class AccommodationAvailabilityComponent implements AfterViewInit {

  datesToHighlight : string[] = [];
  dateRange:DateRange<Date>|null =null;

  defaultPrice: number = 0;
  intervalPrice:number = 0.0;
  @Output() defaultPriceEmitter = new EventEmitter<number> ();
  @Output() priceType = new EventEmitter<string> ();
  @Output() conformationType = new EventEmitter<string> ();
  @Output() pricesForIntervals = new EventEmitter<any>();
  @Output() unavailableIntervalsEmmiter = new EventEmitter<DateRange<Date>>();

  @Input() accommodation: AccommodationDetails | undefined;

  @ViewChild(MatCalendar) calendar!: MatCalendar<Date>;

  constructor(private accommodationDetailsService: AccommodationDetailsService,
              private snackService: SnackBarService, private _snackBar: MatSnackBar,
              private cdr: ChangeDetectorRef) {
    this.priceType.emit("FOR_GUEST");
    this.conformationType.emit("MANUAL");
  }

  ngAfterViewInit(): void {
        if(this.accommodation) {
          this.loadDates();
          this.calendar.dateClass = this.dateClass(this.datesToHighlight);
        }
    }

  ngAfterContentInit(): void {
        this.initializeFields();
    }

  initializeFields(): void {
    if(this.accommodation) {
      this.defaultPrice = this.accommodation.defaultPrice;
      this.defaultPriceEmitter.emit(this.defaultPrice);
    }
  }


  onPriceTypeChange(event:any):void {
    const selected = event.target.value;
    if(selected == "perPerson"){
      this.priceType.emit("FOR_GUEST");
    }
    if (selected == "perNight") {
      this.priceType.emit("FOR_ACCOMMODATION");
    }
  }

  onConformationTypeChange(event: any):void {
    if (event.target.checked) { this.conformationType.emit("AUTOMATIC"); }
    else { this.conformationType.emit("MANUAL"); }
  }

  onDefaultPriceChange(): void {
    this.defaultPriceEmitter.emit(this.defaultPrice);
  }

  setPriceForInterval() {
    if(this.dateRange == null) {
      this.openSnackBar("WARNING! Select date range first!");
      return;
    }
    if(this.intervalPrice == 0) {
      this.openSnackBar("WARNING! Enter price first!");
      return;
    }

    this.pricesForIntervals.emit({
      "price": this.intervalPrice.toFixed(2),
      "startDate": this.dateRange.start,
      "finishDate": this.dateRange.end
    });
    this.openSnackBar("SUCCESS: Price will be updated!");
  }

  setUnavailable() {
    if(this.dateRange == null) {
      this.openSnackBar("WARNING! Select date range first!");
      return;
    }
    this.unavailableIntervalsEmmiter.emit(this.dateRange);
    this.openSnackBar("SUCCESS: Accommodation availability will be updated!");
    this.datesToHighlight = [];
    // @ts-ignore
    this.datesToHighlight.push(this.dateRange.start.toDateString());
    // @ts-ignore
    this.datesToHighlight.push(this.dateRange.end.toDateString());
    this.calendar.dateClass = this.dateClass(this.datesToHighlight);
    this.cdr.detectChanges();
  }

  setPriceForDate(date:Date): void {
    if(this.accommodation) {
      this.accommodationDetailsService.getPrice(this.accommodation.id, date.toDateString()).subscribe({
        next: (data: number) => {
          this.intervalPrice = data;
        },
        error: (_) => {console.log("Greska!")}
      });
    }
  }

  dateClass(dates: string[]) {
    return (date: Date): MatCalendarCellCssClasses => {
      const highlightDate = dates
        .map(strDate => new Date(strDate))
        .some(d => d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear());

      return highlightDate ? 'special-date' : '';
    };
  }

  loadDates():void{
    this.accommodationDetailsService.getTakenDates(this.accommodation!.id).subscribe({
      next: (data: string[]) => {
        this.datesToHighlight = data.map(date => {return new Date(date).toDateString()});
      },
      error: (_) => {console.log("Greska!")}
    })
  }

  onChange(ev: any) {
    let v = new Date(ev);
    console.log("datum", this.dateRange);
    if(this.dateRange == null){
      this.dateRange =  new DateRange((() => {
        let v = new Date(ev);
        this.setPriceForDate(v);
        return v;
      })(), v);
    }else if(v > this.dateRange!.start!){
      if (this.datesOverlap(this.dateRange.start!, v)){
        console.log("tu sam usao");
        this.dateRange = null;
      }
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

  openSnackBar(message: string) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: 5000,
    });
    this.snackService.errorMessage$.next(message)
  }

}