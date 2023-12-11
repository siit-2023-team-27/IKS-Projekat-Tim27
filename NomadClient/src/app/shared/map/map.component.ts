import {AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import * as L from 'leaflet';
import {MapService} from "./map.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit{
  private map:any;
  private marker: L.Marker = new L.Marker([1, 1]);
  inputLocation: string = "";
  suggestedLocations: string[] = [];

  @ViewChild('locationsDatalist', { static: true }) locationsDatalist!: ElementRef;

  @Output() currentLocation = new EventEmitter<string> ();

  constructor(private mapService: MapService) {}

  registerOnClick(): void {
    this.map.on('click', (e: any) => {
      this.map.removeLayer(this.marker);
      const coord = e.latlng;
      const lat = coord.lat;
      const lng = coord.lng;
      this.marker = new L.Marker([lat, lng]).addTo(this.map);
      this.mapService.reverseSearch(lat, lng).subscribe((res) => {
        this.marker.bindPopup(res.display_name).openPopup();
        this.inputLocation = res.display_name;
      });
    });
  }

  onLocationInputChanged(event: any) {
    this.mapService.search(this.inputLocation).subscribe({
      next: (results) => {
        console.log();
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

        // L.marker([result[0].lat, result[0].lon])
        //     .addTo(this.map)
        //     .bindPopup('Pozdrav iz Strazilovske 19.')
        //     .openPopup();
      },
      error: () => {},
    });
  }

  onSearchLocation() {
    this.mapService.search(this.inputLocation).subscribe({
          next: (result) => {
            if(result.length > 0) {
              this.map.removeLayer(this.marker);
              this.marker = new L.Marker([result[0].lat, result[0].lon]).addTo(this.map);
              this.marker.bindPopup(this.inputLocation).openPopup();
            }
          },
          error: () => {},
        });
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [45.2396, 19.8227],
      zoom: 13,
    });

    const tiles = L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          maxZoom: 18,
          minZoom: 3,
          attribution:
              '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }
    );
    tiles.addTo(this.map);

    this.registerOnClick();
  }

  ngAfterViewInit(): void {
    let DefaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
    });

    L.Marker.prototype.options.icon = DefaultIcon;
    this.initMap();
  }
}
