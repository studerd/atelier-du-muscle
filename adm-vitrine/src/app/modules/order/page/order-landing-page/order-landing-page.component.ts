import {Component, OnInit} from '@angular/core';
import {interval, of, switchMap} from 'rxjs';
import {OrderService} from '@order/service/order.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {isNil} from 'lodash';
import {ApiResponse} from '@shared/model';
import {OrderHelper} from '@order/helper';

@Component({
  selector: 'app-order-landing-page',
  templateUrl: './order-landing-page.component.html',
  styleUrls: ['./order-landing-page.component.scss']
})
export class OrderLandingPageComponent implements OnInit {
  secondes = 5;
  id: string = '';

  constructor(public router: Router, public orderService: OrderService, public activatedRouter: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.orderService.showBucket$.next(false);
    this.orderService.updateBucket(OrderHelper.getEmpty());
    this.activatedRouter.params.pipe(
      switchMap((params: Params) => {
        if (isNil(params['id'])) {
          return of({result: false, data: '', code: ''});
        }
        this.id = params['id'];
        return this.orderService.webhook(params['id']);
      })).subscribe((response: ApiResponse) => {
      if (this.id.length > 0) {
        interval(1000).subscribe(() => {
          if (this.secondes === 0) {

          } else {
            this.secondes--;
          }
        })
      }
    })
  }

  go() {
    this.router.navigate(['/order/detail/' + this.id]).then();

  }
}
