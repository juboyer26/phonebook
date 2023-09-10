import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export enum NotificationType {
  SUCCESS = 'toast-success',
  INFO = 'toast-info',
  WARNING = 'toast-warning',
  ERROR = 'toast-error',
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private _toastr: ToastrService) { }

  show(message: string, type: NotificationType, title?: string): void {
    this._toastr.show(message, title, undefined, type);
  }

}
