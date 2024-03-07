import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {tap} from 'rxjs/operators';
import {ApiResponse} from '@shared/model';
import {OrderService} from '@order/service/order.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-info-home-part',
  templateUrl: './info-home-part.component.html',
  styleUrls: ['./info-home-part.component.scss']
})
export class InfoHomePartComponent implements OnInit {
  formGroup!: FormGroup;
  error = '';
  message = '';
  loading = false;

  constructor(public router: Router, public orderService: OrderService) {
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

  navigate(url: string): void {
    window.open(url, "_BLANK");
  }
}
