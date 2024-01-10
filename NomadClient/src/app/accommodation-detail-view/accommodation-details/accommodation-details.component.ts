import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { AccommodationDetails, Review } from '../model/accommodationDetails.model';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faWifi } from '@fortawesome/free-solid-svg-icons';
import { AccommodationDetailsService } from '../accommodation-details.service';
import { ActivatedRoute } from '@angular/router';
import {CommentService} from "../comment.service";
@Component({
  selector: 'app-accommodation-details',
  templateUrl: './accommodation-details.component.html',
  styleUrls: ['./accommodation-details.component.css']

})

export class AccommodationDetailsComponent implements OnInit{

  //@Input() accommodation: AccommodationDetails;
  accommodation: AccommodationDetails | undefined;
  reviews?: Review[];
  id?:number;
  startDate:string = "";
  endDate:string = "";
  peopleNum:number = 0;
	constructor(private service: AccommodationDetailsService, private commentService: CommentService, private route: ActivatedRoute) {

  }
  ngOnInit(): void {
      this.route.params.subscribe(params => {
          this.id = +params['id']; // (+) converts string 'id' to a number

          this.startDate = params['startDate']
          this.endDate = params['endDate']
          this.peopleNum = +params['peopleNum']
          this.service.get(this.id).subscribe({
              next: (data: AccommodationDetails) => {
                  this.accommodation = data;
                  this.getComments()
              },
              error: (_) => {console.log("Greska!")}
          })
      });

  }
  getComments(): void {
    this.commentService.getAccommodationComments(this.accommodation!.id!).subscribe({
      next: (data:Review[]) => {
        this.reviews = data;
      }
    })
  }
  protected readonly encodeURIComponent = encodeURIComponent;
}
