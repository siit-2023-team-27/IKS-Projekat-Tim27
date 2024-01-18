import {Component, OnInit} from '@angular/core';
import {User} from '../model/user.model';
import {AccountService} from '../account.service';

@Component({
  selector: 'app-admin-accounts-view',
  templateUrl: './admin-accounts-view.component.html',
  styleUrls: ['./admin-accounts-view.component.css']
})
export class AdminAccountsViewComponent implements OnInit{
  users: User[] = [];
  constructor(private userService: AccountService){}
  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (data:User[]) => {
        this.users = data;
      },
      error: (_) => {console.log("Greska!")}
  })
  }
  displayedColumns: string[] = ['firstName', 'lastName', 'userName', 'address', 'phoneNumber', 'button'];
  block(userId:number): void{
    var self = this
    this.userService.suspendUser(userId).subscribe({
      next(_) {
        for(var user of self.users){
          if(user.id == userId){
            user.suspended=true;
          }
        }
      },
      error(_){}
    })
  }
  unBlock(userId:number): void{
    var self = this

    this.userService.unSuspendUser(userId).subscribe({
      next(_) {
        for(var user of self.users){
          if(user.id == userId){
            user.suspended=false;
          }
        }
      },
      error(_){}
    })
  }
}
