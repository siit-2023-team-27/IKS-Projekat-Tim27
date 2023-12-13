import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FilterData} from "../model/filterData.model";
import {SearchFilterForm} from "../model/searchFilterForm.model";
import {AccommodationSearch} from "../model/accommodation-search.model";
import {SearchFilterService} from "../search-filter.service";
import {Accommodation} from "../../accommodation/model/accommodation.model";
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  ngOnInit() {
    this.searchFilterService.searchFilterForm$.subscribe(data => {
      this.searchFilterForm = data;
    });
  }
  searchFilterForm: SearchFilterForm = {
    city: '',
    startDate: '',
    finishDate: '',
    peopleNum:-1,
    amenities: [],
    minPrice:-1,
    maxPrice:-1,
    accommodationType:''
  };
  constructor(private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<FilterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FilterData,
              private searchFilterService: SearchFilterService
  ) {
  }

  filterForm = new FormGroup({
    options: new FormControl(""),
    minPrice: new FormControl(0),
    maxPrice: new FormControl(1000),
  });

  filter(): void {
    this.searchFilterForm.minPrice = this.filterForm.value.minPrice||0;
    this.searchFilterForm.maxPrice = this.filterForm.value.maxPrice||1000;
    this.searchFilterForm.accommodationType = this.filterForm.value.options||"";

    this.searchFilterService.searchFilter(this.searchFilterForm).subscribe({
      next: (data: AccommodationSearch[]) => { this.searchFilterService.accommodations$.next(data); },
    });
  }

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }
  onCancel(): void {
    this.dialogRef.close();
  }
  onFilter(): void {
    this.filter();
    this.dialogRef.close({
    });
  }
}

