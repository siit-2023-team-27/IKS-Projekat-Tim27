
import {faLocationArrow, faPeopleGroup, faSearch, faFilter} from "@fortawesome/free-solid-svg-icons";
import {MatDialog} from "@angular/material/dialog";
import {FilterComponent} from "../filter/filter.component";
import {User} from "../../infrastructure/auth/model/user.model";
import {FilterData} from "../model/filterData.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Login} from "../../infrastructure/auth/model/login.model";
import {SearchFilterForm} from "../model/searchFilterForm.model";
import {AuthService} from "../../infrastructure/auth/auth.service";
import {SearchFilterService} from "../search-filter.service";
import {Accommodation} from "../../accommodation/model/accommodation.model";
import {AccommodationSearch} from "../model/accommodation-search.model";
import {Component, ElementRef, ViewChild} from '@angular/core';
import {MapService} from "../../shared/map/map.service";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  protected readonly faLocationArrow = faLocationArrow;
  protected readonly faPeopleGroup = faPeopleGroup;
  protected readonly faSearch = faSearch;
  protected readonly faFilter = faFilter;
  constructor(public dialog: MatDialog, private searchFilterService: SearchFilterService) {}
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
    accommodationType:""
  };
  searchForm = new FormGroup({
    city: new FormControl(),
    startDate: new FormControl(),
    finishDate: new FormControl(),
    peopleNum: new FormControl()
  });
  search(): void {
    this.searchFilterForm.city = this.searchForm.value.city;
    this.searchFilterForm.startDate = this.searchForm.value.startDate.toLocaleString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit',});
    this.searchFilterForm.finishDate = this.searchForm.value.finishDate.toLocaleString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit',});
    this.searchFilterForm.peopleNum = this.searchForm.value.peopleNum;
    this.searchFilterService.searchFilterForm$.next(this.searchFilterForm);
    this.searchFilterService.search(this.searchFilterForm).subscribe({
      next: (data: AccommodationSearch[]) => { this.searchFilterService.accommodations$.next(data); },
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(FilterComponent, {

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }


  inputLocation: string = "";
  suggestedLocations: string[] = [];

  @ViewChild('locationsDatalist', { static: true }) locationsDatalist!: ElementRef;

  constructor(private mapService: MapService) {
  }

  onLocationInputChanged(event: any) {
    console.log("tu samm");
    this.mapService.search(this.inputLocation).subscribe({
      next: (results) => {
        results.forEach((result: { display_name: string; }) => {
          this.suggestedLocations.push(result.display_name);
        })

        const datalistElement = this.locationsDatalist.nativeElement;
        while (datalistElement.firstChild) {
          datalistElement.removeChild(datalistElement.firstChild);
        }

        this.suggestedLocations.forEach((suggestion: string) => {
          const optionElement = document.createElement('option');
          optionElement.value = suggestion;
          datalistElement.appendChild(optionElement);
        });
      },
      error: () => {},
    }
}


