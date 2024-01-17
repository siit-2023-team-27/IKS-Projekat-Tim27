import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MyNotification, NotificationsPreferencesGuest, NotificationsPreferencesHost, Message} from "./notification.model";
import {environment} from "../../env/env";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  urlSocket: string = environment.apiHost + "socket";

  constructor(private _http: HttpClient) { }

  addNotification(notification: MyNotification){
    let message: Message = {
      message: notification.text,
      fromId: "1",
      toId: notification.targetAppUser.toString()
    };
    //this.webSocketService.sendMessageUsingSocket(message);
    return this._http.post<MyNotification>(`http://localhost:8080/api/notifications`, notification)
  }

  postNotification(data: Notification) {
    return this._http.post<Notification>(this.urlSocket, data)
        .pipe(map((data: Notification) => { return data; }));
  }

  getNotificationsForUser(userId: number) {
    return this._http.get<MyNotification[]>(`http://localhost:8080/api/notifications/user/${+userId}`)
  }

  getNotificationsPreferencesForGuest(userId: number) {
    return this._http.get<NotificationsPreferencesGuest>(`http://localhost:8080/api/users/notifications-preferences/${+userId}`)
  }

  getNotificationsPreferencesForHost(userId: number) {
    return this._http.get<NotificationsPreferencesHost>(`http://localhost:8080/api/users/notifications-preferences/${+userId}`)
  }

  setNotificationPreferences(userId: number, notificationType:string, value: boolean) {
    return this._http.put<NotificationsPreferencesHost>(`http://localhost:8080/api/users/notifications-preferences/${+userId}?notificationType=${notificationType}&value=${value}`, null);
  }
}
