import {Injectable} from "@angular/core";
import {Login} from "../model/login.model";
import {LoginResponse} from "../model/login.response.model";

@Injectable({
  providedIn: 'root',
})
export class TokenStorage {
  constructor() {}

  saveAccessToken(token: LoginResponse): void {
    localStorage.removeItem('role');
    localStorage.removeItem('id');
    localStorage.setItem('role', token.role);
    localStorage.setItem('id', String(token.id));
  }

  getRole() {
    return localStorage.getItem('role');
  }
  getId() {
    return localStorage.getItem('id');
  }

  clear() {
    localStorage.removeItem('role');
    localStorage.removeItem('id');
  }
}
