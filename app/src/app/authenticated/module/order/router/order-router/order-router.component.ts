import {Component, OnInit} from '@angular/core';
import {DataViewerActionConfig} from '@shared/module/data-view/model';
import {NavigationService} from '@shared/service';
import {OrderService} from '@order/service/order.service';
import {TooltipPosition} from '@shared/module/tooltip/model';
import {LabelWithParam} from '@shared/model/label-with-param.interface';
import {AppPageEnum} from '@shared/model';

@Component({
    selector: 'app-order-router',
    templateUrl: './order-router.component.html',
    styleUrls: ['./order-router.component.scss']
})
export class OrderRouterComponent implements OnInit {
    actions: DataViewerActionConfig[] = [];
    tooltipPosition = TooltipPosition;

    constructor(public navigationService: NavigationService, public dataService: OrderService) {
    }

    ngOnInit(): void {
        this.actions = [
            {
                icon: 'fa-sharp fa-light fa-list-dropdown',
                label: {label:'page.order.list'},
                callback: this.showList,
                navigationService: this.navigationService,
                dataService:this.dataService
            },
            {
                icon: 'fa-sharp fa-light fa-hammer',
                label: {label:'page.order.production'},
                callback: this.showProduction,
                navigationService: this.navigationService,
                dataService:this.dataService
            },
        ]
    }

    private showList() {
        this.navigationService.navigate(AppPageEnum.ORDER_HOME);
    }

    private showProduction() {
        this.navigationService.navigate(AppPageEnum.ORDER_PRODUCTION);
    }
}
