import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {User} from "../infrastructure/auth/model/user.model";
import {HttpClient} from "@angular/common/http";
import {TokenStorage} from "../infrastructure/auth/jwt/token.service";
import {Router} from "@angular/router";
import {Login} from "../infrastructure/auth/model/login.model";
import {LoginResponse} from "../infrastructure/auth/model/login.response.model";
import {environment} from "../../env/env";
import {AuthResponse} from "../infrastructure/auth/model/auth.response.module";
import {SearchFilterForm} from "./model/searchFilterForm.model";
import {AccommodationSearch} from "./model/accommodation-search.model";
import {Accommodation} from "../accommodation/model/accommodation.model";

@Injectable({
  providedIn: 'root'
})
export class SearchFilterService{

  accommodations$ = new BehaviorSubject<AccommodationSearch[]>([]);
  searchFilterForm$ = new BehaviorSubject<SearchFilterForm>({
    city: '',
    startDate: '',
    finishDate: '',
    peopleNum:-1,
    amenities: [],
    minPrice:-1,
    maxPrice:-1,
    accommodationType:""
  });
  constructor(private http: HttpClient,
              private router: Router){}

  search(searchForm: SearchFilterForm): Observable<AccommodationSearch[]> {
    return this.http.get<AccommodationSearch[]>(environment.apiHost + "accommodations/search-filter?city="
      +searchForm.city+"&from="+searchForm.startDate+"&to="+searchForm.finishDate+"&peopleNum="+searchForm.peopleNum);
  }
  searchFilter(searchForm: SearchFilterForm): Observable<AccommodationSearch[]> {
    alert("filtering.."+ searchForm.accommodationType)
    let parameters: string = "";
    if(searchForm.minPrice != -1){
      parameters += "&minimumPrice=" +searchForm.minPrice;
    }
    if(searchForm.maxPrice != -1){
      parameters += "&maximumPrice=" +searchForm.maxPrice;
    }
    if(searchForm.accommodationType != ""){
      parameters += "&type=" + searchForm.accommodationType;
    }

    return this.http.get<AccommodationSearch[]>(environment.apiHost + "accommodations/search-filter?city="
      +searchForm.city+"&from="+searchForm.startDate+"&to="+searchForm.finishDate+"&peopleNum="+searchForm.peopleNum+parameters);
  }


}
