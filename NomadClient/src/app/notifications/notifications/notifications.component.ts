import {Component} from '@angular/core';
import {NotificationService} from "../notification.service";
import {User} from "../../account/model/user.model";
import {AccountService} from "../../account/account.service";
import {MyNotification, NotificationsPreferencesGuest, NotificationsPreferencesHost} from "../notification.model";
import {TokenStorage} from "../../infrastructure/auth/jwt/token.service";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent {

  notifications: MyNotification[] = [];
  user: User = {} as User;
  isGuest: boolean = false;

  notificationsPreferencesG: NotificationsPreferencesGuest = {} as NotificationsPreferencesGuest;
  notificationsPreferencesH: NotificationsPreferencesHost = {} as NotificationsPreferencesHost;

  constructor(private notificationService:NotificationService,
              private accountService: AccountService,
              private tokenStorage:TokenStorage) {
  }

  ngOnInit() {
    this.getNotifications();

    this.accountService.getLoggedUser().subscribe({
      next: (data: User) => {
          this.user = data;
          if (this.user.roles[0] == 'GUEST') {
            this.isGuest = true;

            this.notificationService.getNotificationsPreferencesForGuest(this.user.id).subscribe({
              next: (data) => {
                this.notificationsPreferencesG = data;
                console.log(this.notificationsPreferencesG)

                const inputEl = document.getElementById("REQUEST_RESPONSE") as HTMLInputElement;
                inputEl.checked = this.notificationsPreferencesG.REQUEST_RESPONSE;
              }
            })
          }else{
            this.notificationService.getNotificationsPreferencesForHost(this.user.id).subscribe({
              next: (data) => {
                this.notificationsPreferencesH = data;
                console.log(this.notificationsPreferencesH);
                const inputEl1 = document.getElementById("NEW_ACCOMMODATION_RATING") as HTMLInputElement;
                inputEl1.checked = this.notificationsPreferencesH.NEW_ACCOMMODATION_RATING;
                const inputEl2 = document.getElementById("NEW_RATING") as HTMLInputElement;
                inputEl2.checked = this.notificationsPreferencesH.NEW_RATING;
                const inputEl3 = document.getElementById("NEW_RESERVATION") as HTMLInputElement;
                inputEl3.checked = this.notificationsPreferencesH.NEW_RESERVATION;
                const inputEl4 = document.getElementById("RESERVATION_CANCELED") as HTMLInputElement;
                inputEl4.checked = this.notificationsPreferencesH.RESERVATION_CANCELED;
              }
            })
          }
        },
      error: () => { console.log("Error while reading logged user!"); }
    })

  }

  getNotifications() {
    this.notificationService.getNotificationsForUser(+this.tokenStorage.getId()!).subscribe({
      next: (data: MyNotification[]) => {
          this.notifications = data;
        },
      error: () => { console.log("Error while reading notifications!"); }
    });
  }

  onChange(event: any) {
    const inputElement = event.target as HTMLInputElement;
    console.log(inputElement.id)
    this.notificationService.setNotificationPreferences(this.user.id, inputElement.id, inputElement.checked).subscribe({
      next: () => {console.log(inputElement.id)},
      error: () => {console.log("Greska");}
    })
  }

  formatDate(date: Date): string {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }
}
