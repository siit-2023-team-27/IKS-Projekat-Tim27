import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {AccommodationSearch} from "../layout/model/accommodation-search.model";
import {SearchFilterForm} from "../layout/model/searchFilterForm.model";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Amenity} from "../layout/model/amenity.model";
import {environment} from "../../env/env";

@Injectable({
  providedIn: 'root'
})
export class SnackBarService{
  errorMessage$ = new BehaviorSubject<string>('');

}
