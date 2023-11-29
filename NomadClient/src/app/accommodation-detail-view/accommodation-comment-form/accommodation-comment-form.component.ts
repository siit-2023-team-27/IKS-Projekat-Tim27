import { Component } from '@angular/core';
import { FloatLabelType } from '@angular/material/form-field';
@Component({
  selector: 'app-accommodation-comment-form',
  templateUrl: './accommodation-comment-form.component.html',
  styleUrls: ['./accommodation-comment-form.component.css']
})
export class AccommodationCommentFormComponent {
  getFloatLabelValue(): FloatLabelType  { 
    return 'auto';
  }
}