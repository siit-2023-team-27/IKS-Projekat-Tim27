import {Component, Input, OnInit} from '@angular/core';
import {Review} from '../model/accommodationDetails.model';
import {faCircleUser} from "@fortawesome/free-regular-svg-icons";
import {AccommodationDetailsService} from '../accommodation-details.service';

@Component({
  selector: 'app-accommodation-comments',
  templateUrl: './accommodation-comments.component.html',
  styleUrls: ['./accommodation-comments.component.css']
})
export class AccommodationCommentsComponent implements OnInit {
  @Input() reviews?: Review[]
  @Input() accommodationId?:number;
  faCircleUser=faCircleUser;
  constructor(private service: AccommodationDetailsService){

  }
  numSequence(n: number): Array<number> {
    return Array(Math.floor(n));
  }
  ngOnInit():void{

  }
}
