import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../env/env";
import {AbstractRestService} from "../abstract.service";
import {AccommodationDetails} from "../accommodation-detail-view/model/accommodationDetails.model";
import {Observable} from "rxjs";
import {FavouriteAccommodation} from "./model/favouriteAccommodation.model";

@Injectable({
  providedIn: 'root'
})
export class FavouriteService extends AbstractRestService<FavouriteService> {

  constructor(private httpClient: HttpClient) {
    super(httpClient, environment.apiHost + "favourites");
  }

  getFavouritesForGuest(guestId: number): Observable<FavouriteAccommodation[]> {
    return this.httpClient.get<FavouriteAccommodation[]>(`${this.actionUrl}/guest/${+guestId}`);
  }

  likeOrDislike(accommodationId:number, guestId:number): Observable<boolean> {
    return this.httpClient.put<boolean>(`${this.actionUrl}/like-dislike/${+accommodationId}/${+guestId}`, {});
  }

  isLiked(accommodationId:number, guestId:number): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.actionUrl}/isLiked/${+accommodationId}/${+guestId}`);
  }

}
