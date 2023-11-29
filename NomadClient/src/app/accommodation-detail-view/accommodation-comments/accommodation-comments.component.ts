import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Review } from 'src/app/model/accommodation.model';
@Component({
  selector: 'app-accommodation-comments',
  templateUrl: './accommodation-comments.component.html',
  styleUrls: ['./accommodation-comments.component.css']
})
export class AccommodationCommentsComponent {
  @Input() reviews?: Review[];
  constructor(){
    this.reviews = [];
  }
  numSequence(n: number): Array<number> { 
    return Array(Math.floor(n)); 
  }
}
