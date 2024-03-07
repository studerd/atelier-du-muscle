import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {OrderService} from '@order/service/order.service';
import {Order, OrderStatus} from '@order/model';
import {tap} from 'rxjs/operators';
import {productHelper} from '@product/helper';
import {BehaviorSubject} from 'rxjs';
import {ProductProductionGroup} from '@product/model';

@Component({
    selector: 'app-order-production-page',
    templateUrl: './order-production-page.component.html',
    styleUrls: ['./order-production-page.component.scss']
})
export class OrderProductionPageComponent implements OnInit {
    productions$ = new BehaviorSubject<ProductProductionGroup[]>([]);
    orders:Order[]=[];
    @ViewChild('pdfTable') pdfTable!: ElementRef;

    constructor(public orderService: OrderService) {

    }

    ngOnInit(): void {
        this.orderService.list$.pipe(
            tap((orders: Order[]) => {
                this.orders = orders;
                this.productions$.next(productHelper.orderToProductProduction(orders));
            })).subscribe();

        this.orderService.status(OrderStatus.IN_PRODUCTION);
    }

}
