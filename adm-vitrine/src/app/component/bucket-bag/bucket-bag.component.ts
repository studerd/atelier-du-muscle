import {Component, OnInit} from '@angular/core';
import {Order} from '@order/model';
import {OrderHelper} from '@order/helper';
import {AuthService} from '@security/service';
import {Router} from '@angular/router';
import {OrderService} from '@order/service/order.service';

@Component({
  selector: 'app-bucket-bag',
  templateUrl: './bucket-bag.component.html',
  styleUrls: ['./bucket-bag.component.scss']
})
export class BucketBagComponent implements OnInit {
  totalPrice = 0;
  bucket: Order = OrderHelper.getEmpty();
  isAuthenticated = false;
  success = false;
  estimatedCost = 0;

  constructor(public authService: AuthService, public router: Router, public orderService: OrderService) {
  }

  ngOnInit(): void {
    this.orderService.bucket$.subscribe((bucket: Order) => {
      this.bucket = bucket;
      if (this.bucket.lines.length > 0) {
        this.totalPrice = OrderHelper.getTotalPrice(this.bucket);
        this.estimatedCost = OrderHelper.calculateEstimatedCost(this.bucket);
      } else {
        this.totalPrice = 0;
      }
    })
  } goShopping() {
    this.router.navigate(['/shop']).then();
  }
  validate():void{
    this.router.navigate(['/bucket']).then();}

  removeItem(index: number):void {
    this.bucket.lines.splice(index, 1);
    this.orderService.updateBucket(this.bucket);

  }
  signin():void {
    this.router.navigate(['/acc/signin']).then();
  }
}
