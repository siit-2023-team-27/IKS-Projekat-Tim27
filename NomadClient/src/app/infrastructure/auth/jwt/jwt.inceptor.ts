import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessTokenRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ` + localStorage.getItem("access-token"),
      },
    });
    return next.handle(accessTokenRequest);
  }
}
