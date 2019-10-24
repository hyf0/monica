import { getIsDevelopment } from "./helper";

export const IS_DEV = getIsDevelopment();


export enum Color {
  BLUE = '#2196f3',
  GREEN = '#43a047',
  YELLOW = '#fdd835',
  ORANGE = '#ff5722',
  RED = '#f44336',
}

export enum NotificationType {
  ERROR = 'error',
  WARN = 'warn',
  SUCCESS = 'success',
}
