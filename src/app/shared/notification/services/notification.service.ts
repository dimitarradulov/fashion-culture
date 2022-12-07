import { Injectable } from '@angular/core';
import { BehaviorSubject, asyncScheduler } from 'rxjs';

interface NotificationConfig {
  message: string;
  type: string;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  isShown = new BehaviorSubject<boolean>(false);
  config = new BehaviorSubject<NotificationConfig>({
    message: 'This is a notification alert!',
    type: 'success',
  });

  constructor() {}

  showNotification(configObj: NotificationConfig) {
    this.config.next(configObj);
    this.isShown.next(true);
    asyncScheduler.schedule(this.hideNotification.bind(this), 5000);
  }

  hideNotification() {
    this.isShown.next(false);
  }
}
