import { Component } from '@angular/core';
import {faLocationArrow, faPeopleGroup, faSearch} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

    protected readonly faLocationArrow = faLocationArrow;
  protected readonly faPeopleGroup = faPeopleGroup;
  protected readonly faSearch = faSearch;
}
