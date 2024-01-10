import {Component} from '@angular/core';
import {NotificationService} from "../notification.service";
import {User} from "../../account/model/user.model";
import {AccountService} from "../../account/account.service";
import {MyNotification} from "../notification.model";
import {TokenStorage} from "../../infrastructure/auth/jwt/token.service";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent {

  notifications: MyNotification[] = [];
  user: User = {} as User;

  constructor(private notificationService:NotificationService,
              private accountService: AccountService,
              private tokenStorage:TokenStorage) {
  }

  ngOnInit() {
    this.getNotifications();
    console.log(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }))
  }

  getNotifications() {
    this.notificationService.getNotificationsForUser(+this.tokenStorage.getId()!).subscribe({
      next: (data: MyNotification[]) => {
          this.notifications = data;
        },
      error: () => { console.log("Error while reading notifications!"); }
    });
  }


  formatDate(date: Date): string {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }
}
