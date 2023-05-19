import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastr: ToastrService, private snackBar: MatSnackBar) {}

  showSuccess(message: string, title: string) {
    this.toastr.success(message, title);
  }

  showError(message: string, title: string) {
    this.toastr.error(message, title);
  }

  showInformation(message: string, title: string) {
    this.toastr.info(message, title);
  }

  showWarning(message: string, title: string) {
    this.toastr.warning(message, title);
  }

  showSnackBar(message: string, duration:number=5000) {
    this.snackBar.open(message, 'Atenção!!!', {
      duration: duration,
    });
  }
}
