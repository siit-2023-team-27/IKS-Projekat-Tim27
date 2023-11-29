import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class TokenStorage {
  constructor() {}

  saveAccessToken(token: string): void {
    localStorage.removeItem('access-token');
    localStorage.setItem('access-token', token);
  }

  getAccessToken() {
    return localStorage.getItem('access-token');
  }

  clear() {
    localStorage.removeItem('access-token');
    localStorage.removeItem('user');
  }
}
