import {Component, Input} from '@angular/core';
import {User} from "../model/user.model";
import {AccountService} from "../account.service";
import {AuthService} from "../../infrastructure/auth/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  isModalVisible: boolean = false;
  deleteConformation: boolean = false;

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
}
