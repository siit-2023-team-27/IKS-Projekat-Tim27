import {HttpClient} from "@angular/common/http";
import { AccommodationDetails } from "./model/accommodationDetails.model";
import {environment} from "../../env/env";
import {Injectable} from "@angular/core";
import { AbstractRestService } from "../abstract.service";
import { AccommodationVerificationRequest } from "./model/accommodationVerificationRequest.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})

export class AccommodationDetailsService extends AbstractRestService<AccommodationDetails>{
  constructor(private httpClient: HttpClient) {
    super(httpClient, environment.apiHost + "accommodations");
  }
  getRequests():Observable<AccommodationVerificationRequest[]> {
    return this._http.get<AccommodationVerificationRequest[]>(`${this.actionUrl}`);
  }
  accept(id:number):Observable<AccommodationVerificationRequest>{
    return this._http.put<AccommodationVerificationRequest>(`${this.actionUrl}/verify/${+id}`, {})
  }
}
