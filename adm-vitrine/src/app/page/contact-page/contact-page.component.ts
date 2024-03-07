import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {OrderService} from '@order/service/order.service';
import {ApiResponse} from '@shared/model';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent implements OnInit {
  formGroup!: FormGroup;
  error = '';
  message = '';
  loading = false;

  constructor(public orderService: OrderService) {
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup<any>({
      name: new FormControl("", [Validators.required]),
      mail: new FormControl("", [Validators.required]),
      phone: new FormControl(""),
      message: new FormControl("", [Validators.required])
    })
  }

  submit(): void {
    this.message = "";
    this.error = "";
    if (!this.loading && this.formGroup.valid) {
      this.orderService.sendMail(this.formGroup.value)
        .pipe(tap(() => this.loading = true)).subscribe((data: ApiResponse) => {
        this.loading = false;
        if (data.result) {
          this.message = data.data;
        } else {
          this.error = data.data;
        }
      });
    } else {
      this.error = "Vous devez remplir les champs contenant un *"
    }
  }
}
