import {Component, ElementRef, ViewChild} from '@angular/core';
import {faLocationArrow, faPeopleGroup, faSearch} from "@fortawesome/free-solid-svg-icons";
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
    });
  }
}
