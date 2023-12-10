import {AfterViewInit, Component, EventEmitter, Output} from '@angular/core';
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
        this.currentLocation.emit(res.display_name);
      });
    });
  }

  search(): void {
    this.mapService.search('Strazilovska 19, Novi Sad').subscribe({
      next: (result) => {
        console.log(result);
        L.marker([result[0].lat, result[0].lon])
            .addTo(this.map)
            .bindPopup('Pozdrav iz Strazilovske 19.')
            .openPopup();
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
