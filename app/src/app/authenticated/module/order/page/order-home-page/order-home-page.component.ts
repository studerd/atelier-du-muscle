import {Component, OnInit} from '@angular/core';
import {OrderService} from '@order/service/order.service';
import {Router} from '@angular/router';
import {OrderStatus, statusArr} from '@order/model';

@Component({
    selector: 'app-order-home-page',
    templateUrl: './order-home-page.component.html',
    styleUrls: ['./order-home-page.component.scss']
})
export class OrderHomePageComponent implements OnInit {
    currentStatus = OrderStatus.ALL;
    statusArr = statusArr;
    status = OrderStatus;
    showStatusOption = false;

    constructor(public router: Router, public orderService: OrderService) {
    }

    ngOnInit(): void {
        this.orderService.list();
    }

    go(id: string): void {
        this.router.navigate(['dashboard/order/detail/' + id]).then();
    }

    chooseStatus(status: OrderStatus) {
        if (status === OrderStatus.ALL) {
            this.orderService.list();
        } else {
            this.orderService.status(status);
        }
        this.currentStatus = status;
        this.showStatusOption = false;
    }
}
