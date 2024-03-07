import {Component} from '@angular/core';
import {DataViewerRouterConfig} from '@shared/module/data-view/model';
import {NavigationService} from '@shared/service';
import {ProductService} from '@product/service/product.service';

@Component({
    selector: 'app-product-router',
    templateUrl: './product-router.component.html',
    styleUrls: ['./product-router.component.scss']
})
export class ProductRouterComponent {
    config!: DataViewerRouterConfig;

    constructor(public navigation: NavigationService, public dataService: ProductService) {
    }

    ngOnInit(): void {
        this.dataService.list();
        this.config = {
            dataService: this.dataService,
            navigation: this.navigation,
            translateKey: 'page.product-home.',
            showSideBar:true
        }
    }

}
