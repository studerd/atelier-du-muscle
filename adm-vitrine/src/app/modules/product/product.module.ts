import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductShopComponent } from './component/product-shop/product-shop.component';
import {TranslateModule} from '@ngx-translate/core';
import { ProductDetailPageComponent } from './page/product-detail-page/product-detail-page.component';


@NgModule({
    declarations: [
        ProductShopComponent,
        ProductDetailPageComponent
    ],
    exports: [
        ProductShopComponent
    ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    TranslateModule
  ]
})
export class ProductModule { }
