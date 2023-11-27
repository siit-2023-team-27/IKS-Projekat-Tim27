import { Component } from '@angular/core';
import {AuthService} from "./infrastructure/auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NomadClient';
  constructor(
  ) {}
  ngOnInit(): void {
    //this.checkIfLogged();
  }
  onLogout(): void {
  }

  private checkIfLogged(): void {
  }
}
