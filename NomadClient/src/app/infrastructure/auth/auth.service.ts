import {BehaviorSubject, Observable, tap} from "rxjs";
import {User} from "./model/user.model";
import {AuthResponse} from "./model/auth.response.module";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {TokenStorage} from "./jwt/token.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Login} from "./model/login.model";

export class AuthService{

  user$ = new BehaviorSubject<User>({username: "", id:0, role:""});

  constructor(private http: HttpClient,
              private tokenStorage: TokenStorage,
              private router: Router){}

  login(){}
  register(){}
  logout():void{
    this.router.navigate(['/home']).then(_=>{
      this.tokenStorage.clear();
      this.user$.next({username: "", id:0, role:""})
    })
  }

  checkIfLogged(){
    const accessToken = this.tokenStorage.getAccessToken();
    if (accessToken == null) {
      return;
    }
    this.setUser();
  }

  private setUser():void{
    const jwtHelperService = new JwtHelperService();
    const accessToken = this.tokenStorage.getAccessToken() || "";
    const user: User = {
      id: +jwtHelperService.decodeToken(accessToken).id,
      username: jwtHelperService.decodeToken(accessToken).username,
      role: jwtHelperService.decodeToken(accessToken)[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ],
    };
    this.user$.next(user);
  }

}
