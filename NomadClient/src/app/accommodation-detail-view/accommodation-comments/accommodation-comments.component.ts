import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Review } from '../model/accommodationDetails.model';
import {faCircleUser} from "@fortawesome/free-regular-svg-icons";
import { AccommodationDetailsService } from '../accommodation-details.service';
import { ReportCommentDialogComponent } from '../report-comment-dialog/report-comment-dialog.component';
import { OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
@Component({
  selector: 'app-accommodation-comments',
  templateUrl: './accommodation-comments.component.html',
  styleUrls: ['./accommodation-comments.component.css']
})

export class AccommodationCommentsComponent implements OnInit {
  @Input() reviews?: Review[]
  @Input() accommodationId?:number;
  faCircleUser=faCircleUser;
  
  constructor(private service: AccommodationDetailsService, private dialog: MatDialog){
    
  }
  openDialog(id : number): void {
    const dialogRef = this.dialog.open(ReportCommentDialogComponent, {
      data: {reason: "", commentId: id},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
  numSequence(n: number): Array<number> {
    return Array(Math.floor(n));
  }
  ngOnInit():void{
    
  }
}
