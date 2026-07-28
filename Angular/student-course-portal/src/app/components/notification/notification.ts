import { Component } from '@angular/core';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-notification',
  imports: [],
  templateUrl: './notification.html',
  styleUrl: './notification.css',
  // Component-level provider: creates a NEW NotificationService instance scoped to this
  // component (and its children) instead of reusing the app-wide singleton — useful when
  // each instance of this component needs its own independent message list.
  providers: [NotificationService],
})
export class NotificationCard {
  constructor(private notificationService: NotificationService) {}

  get messages(): string[] {
    return this.notificationService.getMessages();
  }

  addSample(): void {
    this.notificationService.notify('You have a new course announcement.');
  }
}
