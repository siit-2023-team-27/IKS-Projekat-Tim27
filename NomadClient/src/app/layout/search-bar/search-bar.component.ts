import { Component } from '@angular/core';
import {faLocationArrow, faPeopleGroup, faSearch, faFilter} from "@fortawesome/free-solid-svg-icons";
import {MatDialog} from "@angular/material/dialog";
import {FilterComponent} from "../filter/filter.component";
import {User} from "../../infrastructure/auth/model/user.model";
import {FilterData} from "../model/filterData.model";

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
  constructor(public dialog: MatDialog) {}
  ngOnInit() {
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(FilterComponent, {

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}


