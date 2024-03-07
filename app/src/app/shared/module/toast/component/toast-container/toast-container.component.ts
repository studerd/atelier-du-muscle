import { Component, OnInit } from '@angular/core';
import {Toast} from '../../model';
import {ToastService} from '../../service/toast.service';

@Component({
  selector: 'app-toast-container',
  templateUrl: './toast-container.component.html',
  styleUrls: ['./toast-container.component.scss']
})
export class ToastContainerComponent implements OnInit {
  toasts: Toast[] = [];

  constructor(public toasterService: ToastService) {
  }

  ngOnInit(): void {
    this.toasterService.toaster$
        .subscribe(toast => {
          this.toasts = [toast, ...this.toasts];
          setTimeout(() => this.toasts.pop(), toast.delay || 3000);
        });
  }

  remove(index: number): void {
    this.toasts = this.toasts.filter((v, i) => i !== index);
  }

}