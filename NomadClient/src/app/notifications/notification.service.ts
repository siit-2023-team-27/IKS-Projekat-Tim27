import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MyNotification} from "./notification.model";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private _http: HttpClient) { }

  addNotification(notification: MyNotification){
    return this._http.post<MyNotification>(`http://localhost:8080/api/notifications`, notification)
  }

  getNotificationsForUser(userId: number) {
    return this._http.get<MyNotification[]>(`http://localhost:8080/api/notifications/user/${+userId}`)
  }
}
