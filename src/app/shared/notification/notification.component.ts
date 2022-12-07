import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { NotificationService } from './services/notification.service';

@Component({
  selector: 'notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit, OnDestroy {
  notificationClass: string;
  notificationMessage: string;
  notificationSubs: Subscription;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationSubs = this.notificationService.config.subscribe(
      (configData) => {
        this.notificationClass = this.getNotificationBackground(
          configData.type
        );
        this.notificationMessage = configData.message;
      }
    );
  }

  onClose() {
    this.notificationService.hideNotification();
  }

  getNotificationBackground(type: string) {
    let backgroundClass = 'bg-info';

    switch (type) {
      case 'success':
        backgroundClass = 'bg-success';
        break;
      case 'danger':
        backgroundClass = 'bg-danger';
        break;
    }

    return backgroundClass;
  }

  ngOnDestroy(): void {
    this.notificationSubs.unsubscribe();
  }
}
