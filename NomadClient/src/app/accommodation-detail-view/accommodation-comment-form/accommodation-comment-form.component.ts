import { Component } from '@angular/core';
import { FloatLabelType } from '@angular/material/form-field';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { AccommodationDetailsService } from '../accommodation-details.service';
import { TokenStorage } from 'src/app/infrastructure/auth/jwt/token.service';
@Component({
  selector: 'app-accommodation-comment-form',
  templateUrl: './accommodation-comment-form.component.html',
  styleUrls: ['./accommodation-comment-form.component.css']
})
export class AccommodationCommentFormComponent {
  text: String = "";
  title: String = "";
  rating: number = 5;
  @Input() accommodationId: number = 0;
  @Output() newCommentEvent = new EventEmitter<string>();

  getFloatLabelValue(): FloatLabelType  { 
    return 'auto';
  }
  constructor(private service: AccommodationDetailsService, private tokenStorage: TokenStorage) {

  }
  setRating(n : number){
    this.rating = n
  }
  post() : void {
    console.log("AAA")
    var comment = {
      "text" : this.title + " " + this.text,
      "rating" : this.rating,
      "userName" : "Aa",
      "id" : 0,
      "userId" : +this.tokenStorage!.getId()!,
      "accommodationId" : +this.accommodationId!
    }
    this.service.addComment(comment).subscribe({
      next: () => {
        this.newCommentEvent.emit("")
      },
      error: (_) => {console.log("Greska!")}
  })
  }
}