export interface NotificationOptions {
    timeOut?: number;
    showProgressBar?: boolean;
    pauseOnHover?: boolean;
    clickToClose?: boolean;
    maxLength?: number;
    maxStacks?: number;
    animate?: "fromRight" | "fromLeft" | "rotate" | "scale";
    position?: ["top" | "bottom", "right" | "left"];
}
