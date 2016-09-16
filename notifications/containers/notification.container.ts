import * as _ from 'lodash';
import { Component, OnInit, OnDestroy, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { TranslatePipe } from 'ng2-translate';
import { Notification } from '../api/notification.dto';
import { NotificationSandbox } from '../sandboxes/notification.sandbox';
import { NotificationService } from '../services/notification.service';

@Component({
    selector: 'notification',
    pipes: [ TranslatePipe ],
    directives: [],
    providers: [],
    styles: [ require('./notification.container.scss') ],
    template: `
        <div class="notification__item notification__item--{{ notification.severity }}" *ngFor="let notification of notifications">
            <div class="notification__close-button" (click)="notify.clear( notification )"><i class="mdi mdi-close"></i></div>
            <strong *ngIf="notification.title">{{ notification.title | translate }}</strong>
            <span>{{ notification.content | translate }}</span>
        </div>
    `
})
export class NotificationContainer implements OnInit, OnDestroy {

    public notifications: Notification[] = [];

    private listener: any;

    constructor ( private notify: NotificationSandbox ) {}

    public ngOnInit(): void {

        this.listener = this.notify.updates().subscribe((event) => {
            if ( event ) {

                switch ( event.action ) {

                    case 'push':
                        this.notifications.push( event.notification );
                        break;
                    
                    case 'clear':
                        _.pull( this.notifications, event.notification );
                        break;
                    
                    case 'clearAll':
                        this.notifications = [];
                        break;
                    
                    default:
                        this.notifications.push({ id: '' + new Date().getUTCMilliseconds(), severity: 'error', title: 'Oops ...', content: 'No valid event action!', created: new Date() });
                        break;
                }
            }
        });
    }

    public ngOnDestroy(): void {
        if ( this.listener ) { 
            this.listener.unsubscribe(); 
        }
    }
}
