import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Accommodation} from "./model/accommodation.model";
import {environment} from "../../env/env";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})

export class AccommodationService{
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Accommodation[]> {
    return this.httpClient.get<Accommodation[]>(environment.apiHost + "accommodations");
  }

  get(id: number): Observable<Accommodation> {
    return this.httpClient.get<Accommodation>(environment.apiHost + "accommodations/" + id);
  }

}
