import {Component} from '@angular/core';
import {DataViewerHomeConfig} from '@shared/module/data-view/model';
import {AppPageEnum} from '@shared/model';
import {ProductService} from '@product/service/product.service';

@Component({
    selector: 'app-product-home-page',
    templateUrl: './product-home-page.component.html',
    styleUrls: ['./product-home-page.component.scss']
})
export class ProductHomePageComponent {
    translateKey = 'page.product-home.';
    config!: DataViewerHomeConfig;

    constructor(public dataService: ProductService) {
    }

    ngOnInit() {
        this.config = {
            translateKey: this.translateKey,
            createPageEnum: AppPageEnum.PRODUCT_CREATE,
            list$: this.dataService.list$
        }
        this.dataService.list();
    }

}