import {HttpClient} from "@angular/common/http";
import { Accommodation } from "./model/accommodation.model";
import {environment} from "../../env/env";
import {Injectable} from "@angular/core";
import { AbstractRestService } from "../abstract.service";

@Injectable({
  providedIn: 'root',
})

export class AccommodationService extends AbstractRestService<Accommodation>{
  constructor(private httpClient: HttpClient) {
    super(httpClient, environment.apiHost + "accommodations");
  }
}
