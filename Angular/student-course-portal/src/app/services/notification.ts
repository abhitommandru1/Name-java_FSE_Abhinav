import { Injectable } from '@angular/core';

// Deliberately NOT providedIn: 'root' — this service is provided at component level
// (see NotificationComponent's `providers` array), so each component that provides it
// gets its own isolated instance instead of sharing the application-wide singleton.
@Injectable()
export class NotificationService {
  private messages: string[] = [];

  notify(message: string): void {
    this.messages.push(message);
  }

  getMessages(): string[] {
    return this.messages;
  }
}
