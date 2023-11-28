import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Accommodation} from "../accommodation/model/accommodation.model";
import {environment} from "../../env/env";
import {User} from "./model/user.model";

@Injectable({
  providedIn: 'root',
})

export class AccountService{
  constructor(private httpClient: HttpClient) {}

  get(id: number): Observable<User> {
    return this.httpClient.get<User>(environment.apiHost + "user/" + id);
  }

}
