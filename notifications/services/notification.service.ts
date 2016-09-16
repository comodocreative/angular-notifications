import { Injectable, bind } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { Notification } from '../api/notification.dto';
import { NotificationEvent } from '../api/notification-event.dto';
import { NotificationOptions } from '../api/notification-options.dto';

@Injectable()
export class NotificationService {

    private emitter: Subject<NotificationEvent> = new BehaviorSubject<NotificationEvent>(null);

    public updates() {
        return this.emitter;
    }

    // Add notification
    public set( notification: Notification, options?: NotificationOptions ): void {

        this.emitter.next({ id: notification.id, action: 'push', notification: notification });

        // Automatically hide notification after 3 seconds
        setTimeout( () => { this.unset( notification ); }, 3000 );
    }

    // Remove notification
    public unset( notification: Notification ): void {
        this.emitter.next({ id: notification.id, action: 'clear', notification: notification });
    }
}

export var notificationServiceInjectables: Array<any> = [
    bind(NotificationService).toClass(NotificationService)
];
