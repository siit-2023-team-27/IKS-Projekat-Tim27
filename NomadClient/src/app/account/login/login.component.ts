import { Component } from '@angular/core';
import {Login} from "../../infrastructure/auth/model/login.model";
import {Router} from "@angular/router";
import {AuthService} from "../../infrastructure/auth/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // windowHeight: number = window.innerHeight;
  // windowWidth: number = window.innerWidth;
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  login(): void {
    const login: Login = {
      username: this.loginForm.value.username || "",
      password: this.loginForm.value.password || "",
    };

      this.authService.login(login).subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
      });
    }


}
