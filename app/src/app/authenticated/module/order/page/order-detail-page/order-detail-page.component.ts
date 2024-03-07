import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, of, switchMap} from 'rxjs';
import {Order, OrderStatus, OrderUpdatePayload, statusChangeArr} from '@order/model';
import {OrderHelper} from '@order/helper';
import {OrderService} from '@order/service/order.service';
import {ActivatedRoute, Params} from '@angular/router';
import {isNil} from 'lodash';
import {tap} from 'rxjs/operators';
import {profileHelper} from '@profile/helper/profile.helper';

@Component({
    selector: 'app-order-detail-page',
    templateUrl: './order-detail-page.component.html',
    styleUrls: ['./order-detail-page.component.scss']
})
export class OrderDetailPageComponent implements OnInit {
    detail$ = new BehaviorSubject<Order>(OrderHelper.getEmpty());
    orderStatus = OrderStatus;
    statusArr = statusChangeArr;
    estimatedCost = 0;
    reductionTva = 0;
    totalPrice = 0;
    trackingURL: string = '';

    constructor(public orderService: OrderService, public activatedRouter: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.activatedRouter.params.pipe(
            switchMap((params: Params) => {
                if (isNil(params['id'])) {
                    return of(OrderHelper.getEmpty());
                }
                return this.orderService.detail(params['id']);
            }),
            tap((order: Order) => {
                this.totalPrice = OrderHelper.getTotalPrice(order);
                this.trackingURL = order.trackingURL;
                this.estimatedCost = OrderHelper.calculateEstimatedCost(order);
                if (!isNil(order.profile.vatNumber)) {
                    if (profileHelper.tvaIsValid(order.profile.vatNumber)) {
                        this.reductionTva = (this.totalPrice + this.estimatedCost) * 0.21;
                    }
                }
                this.detail$.next(order);
            })).subscribe();
    }

    setStatus(status: OrderStatus) {
        const detail = this.detail$.getValue();
        detail.status = status;
        console.log('my new status', status);
        this.detail$.next(detail);
        console.log('my new status', this.detail$.getValue().status);

    }

    changeStatus() {
        const detail = this.detail$.getValue();
        const payload: OrderUpdatePayload = OrderHelper.businessToUpdatePayload(detail);
        payload.trackingURL = this.trackingURL;
        console.log('my trackingURL', this.trackingURL);
        this.orderService.changeStatus(payload).pipe(
            switchMap((order: Order) => this.orderService.detail(detail.id))
        ).subscribe((order: Order) => this.detail$.next(order));
    }
}
