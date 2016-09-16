import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Notification } from '../api/notification.dto';
import { NotificationEvent } from '../api/notification-event.dto';
import { NotificationService } from "../services/notification.service";

@Injectable()
export class NotificationSandbox {

    constructor( private service: NotificationService ) {}

    public updates() {
        return this.service.updates();
    }

    public success ( title: string, content: string ) {
        this.service.set({ id: this.getId(), title: title, content: content, severity: 'success', created: new Date() });
    }

    public error ( title: string, content: string ) {
        this.service.set({ id: this.getId(), title: title, content: content, severity: 'error', created: new Date() });
    }

    public alert ( title: string, content: string ) {
        this.service.set({ id: this.getId(), title: title, content: content, severity: 'alert', created: new Date() });
    }

    public info ( title: string, content: string ) {
        this.service.set({ id: this.getId(), title: title, content: content, severity: 'info', created: new Date() });
    }

    public clear( notification: Notification ) {
        this.service.unset( notification );
    }

    /**
     * Create a unique number with javascript time
     */
    private getId() {
        return '' + new Date().getUTCMilliseconds();
    }
}
