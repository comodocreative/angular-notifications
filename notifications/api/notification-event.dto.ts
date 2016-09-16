import { Notification } from './notification.dto';

export interface NotificationEvent {
  id: string;
  action: string;
  notification: Notification;
}
