import {Injectable} from '@angular/core';
import {Order} from '@order/model';
import {isNil} from 'lodash';
import {OrderHelper} from '@order/helper';
import {ToastService} from '@shared/module/toast/service/toast.service';

@Injectable({
  providedIn: 'root'
})
export class BucketService {
  private bucketKey = 'adm_shop_bucket';
  private localStorage = window.localStorage;

  constructor(public toaster: ToastService) {
  }

  clean(): void {
    this.localStorage.removeItem(this.bucketKey);
  }

  public save(bucket: Order): void {
    this.localStorage.removeItem(this.bucketKey);
    this.localStorage.setItem(this.bucketKey, JSON.stringify(bucket));
  }

  public get(): Order {
    const value: string | null = this.localStorage.getItem(this.bucketKey);
    return (isNil(value)) ? OrderHelper.getEmpty() : JSON.parse(value);
  }
}
