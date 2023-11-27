import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import {
  Datepicker,Input,
  initTE,
  Select
} from "tw-elements";
@Component({
  selector: 'app-filter-accommodation',
  templateUrl: './filter-accommodation.component.html',
  styleUrls: ['./filter-accommodation.component.css'],
  imports : [FontAwesomeModule],
  standalone: true
})
export class FilterAccommodationComponent{
  faCalendar = faCalendar;
  ngOnInit() {
    initTE({ Datepicker, Input});
    const datepickerDisablePast = document.getElementById('checkin-picker');
    new Datepicker(datepickerDisablePast, {
      disablePast: true
    });
  }
}
