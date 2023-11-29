import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-accommodation-images',
  templateUrl: './accommodation-images.component.html',
  styleUrls: ['./accommodation-images.component.css']
})
export class AccommodationImagesComponent {
  @Input() images: String[];
  constructor(){
    this.images = [];
  }
}
