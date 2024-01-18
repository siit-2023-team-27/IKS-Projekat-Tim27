import { Component, OnInit } from '@angular/core';
import { FloatLabelType } from '@angular/material/form-field';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { AccommodationDetailsService } from '../accommodation-details.service';
import { TokenStorage } from 'src/app/infrastructure/auth/jwt/token.service';
import {CommentService} from "../comment.service";
@Component({
  selector: 'app-accommodation-comment-form',
  templateUrl: './accommodation-comment-form.component.html',
  styleUrls: ['./accommodation-comment-form.component.css']
})
export class AccommodationCommentFormComponent implements OnInit{
  text: String = "";
  title: String = "";
  rating: number = 5;
  @Input() accommodationId: number = 0;
  @Input() hostId?: number;
  @Output() newCommentEvent = new EventEmitter<string>();
  @Input() ratingType: string = "accommodation";
  @Input() canRate: Boolean = false;
  hasComment: Boolean = false;

  ngOnInit(): void {
    // this.service.canRate(this.accommodationId, +this.tokenStorage.getId()!).subscribe({
    //   next: (data:Boolean) => {
    //     this.canRate = data;
    //   }
    // })
  }
  getFloatLabelValue(): FloatLabelType  {
    return 'auto';
  }
  constructor(private service: CommentService, private tokenStorage: TokenStorage) {

  }
  setRating(n : number){
    this.rating = n
  }

  post() {
    if(this.ratingType == "accommodation") {this.postAccommodationRating(); }
    else {this.postHostRating(); }
  }

  postAccommodationRating() : void {
    var comment = {
      "text" : this.title + " " + this.text,
      "rating" : this.rating,
      "userName" : "Aa",
      "id" : 0,
      "userId" : +this.tokenStorage!.getId()!,
      "ratedId" : +this.accommodationId!
    }
    this.service.addAccommodationComment(comment).subscribe({
      next: () => {
        // this.canRate = false;

        this.newCommentEvent.emit("")
      },
      error: (_) => {console.log("Greska!")}
  })
  }

  postHostRating(): void {
    var comment = {
      "text" : this.title + " " + this.text,
      "rating" : this.rating,
      "userName" : "Aa",
      "id" : 0,
      "userId" : +this.tokenStorage!.getId()!,
      "ratedId" : +this.hostId!
    }
    console.log("host id: ", this.hostId);
    this.service.addHostComment(comment).subscribe({
      next: () => {
        this.newCommentEvent.emit("")
      },
      error: (_) => {console.log("Greska!")}
    })
  }
}
