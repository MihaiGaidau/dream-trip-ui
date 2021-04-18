import {Injectable} from '@angular/core';
import {MessageService} from 'primeng/api';
import {Toast} from '../models/toast.model';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: Toast[] = [];
  delay = 6000;

  constructor() {
  }

  public add(toast: Toast): void {
    this.toasts = [toast, ...this.toasts];

    setTimeout(() => {
      this.toasts = this.toasts.filter(v => v !== toast);
    }, this.delay);
  }

  public remove(index: number): void {
    this.toasts = this.toasts.filter((toast, i) => i !== index);
  }
}
