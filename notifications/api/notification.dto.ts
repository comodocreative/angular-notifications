export interface Notification {
    id: string;
    severity: string;
    title: string;
    content: string;
    html?: any;
    created: Date;
}
