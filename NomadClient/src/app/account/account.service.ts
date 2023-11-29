import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Accommodation} from "../accommodation/model/accommodation.model";
import {environment} from "../../env/env";
import {User} from "./model/user.model";
import {TokenStorage} from "../infrastructure/auth/jwt/token.service";

@Injectable({
  providedIn: 'root',
})

export class AccountService{
  constructor(private httpClient: HttpClient, private tokenStorage: TokenStorage) {}

  getLoggedUser(): Observable<User> {
    return this.httpClient.get<User>(environment.apiHost + "users/" + this.tokenStorage.getId());
  }

}
