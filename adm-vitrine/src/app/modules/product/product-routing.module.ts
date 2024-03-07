import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductDetailPageComponent} from '@product/page/product-detail-page/product-detail-page.component';

const routes: Routes = [{
  path: 'detail/:id',
  component: ProductDetailPageComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {
}
