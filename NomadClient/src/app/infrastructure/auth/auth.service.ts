import {BehaviorSubject, Observable, tap} from "rxjs";
import {User} from "./model/user.model";
import {AuthResponse} from "./model/auth.response.module";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {TokenStorage} from "./jwt/token.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Login} from "./model/login.model";
import {environment} from "../../../env/env";
import {Injectable} from "@angular/core";
import {LoginResponse} from "./model/login.response.model";
@Injectable({
  providedIn: 'root'
})
export class AuthService{

  user$ = new BehaviorSubject<User>({username: "", id:0, role:""});

  constructor(private http: HttpClient,
              private tokenStorage: TokenStorage,
              private router: Router){}

  login(login: Login): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(environment.apiHost + 'users/login', login)
      .pipe(
        tap((authenticationResponse) => {
          this.tokenStorage.saveAccessToken(authenticationResponse);
          this.setUser();
        })
      );
  }

  logout():void{
    this.tokenStorage.clear();
    this.user$.next({username: "", id:0, role:""})
    this.router.navigate(['/home']);
  }

  checkIfLogged(){
    const accessToken = this.tokenStorage.getRole();
    if (accessToken == null) {
      return;
    }
    this.setUser();
  }

  private setUser(): void {
    const user: User = {
      id: +(this.tokenStorage.getId()|| 0),
      username: "",
      role: this.tokenStorage.getRole()|| "",
    };
    this.user$.next(user);
  }

}
