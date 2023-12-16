import {Component, Input} from '@angular/core';
import {User} from "../model/user.model";
import {AccountService} from "../account.service";
import {AuthService} from "../../infrastructure/auth/auth.service";
import { Login } from 'src/app/infrastructure/auth/model/login.model';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  isResetPasswordMode: boolean = false;
  isModalVisible: boolean = false;
  deleteConformation: boolean = false;
  oldPassword: String = "";
  newPassword: String = "";
  confirmedPassword: String = "";
  errors: String[] = [];
  passwordErrors: String[] = [];
  validationPatterns = {
    "phoneNumber" : new RegExp("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"),
    "userName" : new RegExp("[A-Za-z0-9]{3,20}"),
    "name" : new RegExp("[A-Za-z]{3,20}"),
    "address" : new RegExp("[A-Za-z0-9]{3,20}"),
  }
  @Input() user: User = {} as User;
  isEditMode:boolean=false;
  constructor(private authService: AuthService, private service: AccountService) {
  }
  turnEditMode(){
    this.isEditMode = true;
  }
  exitEditMode(){
    this.isEditMode = false;
  }

  getDeleteConformation(conformation: boolean): void {
    this.isModalVisible = false;
    this.deleteConformation = conformation;
    if (this.deleteConformation) {
      this.service.deleteAccount(this.user.id).subscribe({
        next: () => {
          console.log("User with id ", this.user.id, " is successfully deleted!");
          this.logout();
        },
        error: () => { console.log("Error while deleting user with id: ", this.user.id,  "!"); }
      })
    }
  }
  editUser(): void {
    if(!this.validate()){
      return;
    }
    this.service.editUser(this.user).subscribe({
      next: () => {
        
      },
      error: () => { console.log("Error while editing user with id: ", this.user.id,  "!"); }
    });
  }
  validate(): boolean{
    this.errors = []
    if(!this.validationPatterns.phoneNumber.test(this.user.phoneNumber)){
      this.errors.push("Phone number invalid");
    }
    if(!this.validationPatterns.userName.test(this.user.username)){
      this.errors.push("Username invalid");
    }
    if(!this.validationPatterns.name.test(this.user.firstName)){
      this.errors.push("First Name invalid");
    }
    if(!this.validationPatterns.name.test(this.user.lastName)){
      this.errors.push("Last Name invalid");
    }
    if(!this.validationPatterns.address.test(this.user.address)){
      this.errors.push("Address invalid");
    }
    return this.errors.length == 0;
  }
  showDialog(): void {
    this.isModalVisible = true;
  }

  logout(): void {
    this.authService.logout();
  }
  ngOnInit(): void {
    this.service.getLoggedUser().subscribe({
      next: (data: User) => { this.user = data; },
      error: () => { console.log("Error while reading logged user!"); }
    })
  }
  enterResetPasswordMode() : void {
    this.isResetPasswordMode = true;
    this.isEditMode = false;
  }
  exitResetPasswordMode(): void{
    this.isResetPasswordMode = false;
    this.isEditMode = false;
  }
  resetPassword(): void{
    let validated = true;
    this.passwordErrors = []
    var login: Login = {
      "username" : this.user.username,
      "password" : this.oldPassword as string
    }
    this.authService.reauthenticate(login).subscribe({
      next : (_) => {

        //all good?
        if(this.newPassword.length < 8){
          this.passwordErrors.push("New password must be at least 8 characters")
          validated = false;
        }
        if(this.newPassword != this.confirmedPassword){
          this.passwordErrors.push("Passwords must match")
          validated = false
        }
        if(!validated){
          return;
        }
        this.user.password = this.newPassword as string;
        this.service.editUser(this.user).subscribe({
          next: (_) => {},
          error: (_) => {console.log("Error changing password")}
        })
      },
      error : (e) => {
        console.log(e)

        this.passwordErrors.push("Old Password Incorrect")
        validated = false;
      }
      
  });
    
    
  }
}
