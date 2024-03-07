import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {OrderService} from '@order/service/order.service';
import {Order} from '@order/model';

@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.scss']
})
export class BucketComponent implements OnInit {
  count = 0;

  constructor(public router: Router, public orderService: OrderService) {
  }

  ngOnInit(): void {
    this.orderService.initBucket();
    this.orderService.bucket$.subscribe((order:Order) => {
      this.count = order.lines.length;
    });
  }

  goTo(path: string): void {
    this.router.navigate([path]).then();
  }

  clickBucket(show:boolean) {
    this.orderService.showBucket$.next(show);
  }
}
