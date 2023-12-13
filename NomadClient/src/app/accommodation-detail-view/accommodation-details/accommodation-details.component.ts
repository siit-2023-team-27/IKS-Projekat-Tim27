import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { AccommodationDetails } from '../model/accommodationDetails.model';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faWifi } from '@fortawesome/free-solid-svg-icons';
import { AccommodationDetailsService } from '../accommodation-details.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-accommodation-details',
  templateUrl: './accommodation-details.component.html',
  styleUrls: ['./accommodation-details.component.css']

})

export class AccommodationDetailsComponent implements OnInit{

  //@Input() accommodation: AccommodationDetails;
  accommodation: AccommodationDetails | undefined;
  id?:number;
	constructor(private service: AccommodationDetailsService, private route: ActivatedRoute) {

  }
  ngOnInit(): void {
      this.route.params.subscribe(params => {
          this.id = +params['id']; // (+) converts string 'id' to a number
          this.service.get(this.id).subscribe({
              next: (data: AccommodationDetails) => {
                  this.accommodation = data;
              },
              error: (_) => {console.log("Greska!")}
          })
      });
  }

  protected readonly encodeURIComponent = encodeURIComponent;
}
