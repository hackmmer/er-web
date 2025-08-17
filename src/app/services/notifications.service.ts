import { Injectable } from '@angular/core';
import { notificationType } from '@models/notifications';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificationsService {
  private notificationSubject = new BehaviorSubject<{
    message: string;
    type?: notificationType;
  } | null>(null);
  notification$ = this.notificationSubject.asObservable();

  createNotification(message: string, type: notificationType = 'success') {
    this.notificationSubject.next({ message, type });
  }
}
