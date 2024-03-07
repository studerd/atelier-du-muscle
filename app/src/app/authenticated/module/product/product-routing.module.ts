import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductRouterComponent} from '@product/router';
import {ProductCreatePageComponent, ProductDetailPageComponent, ProductHomePageComponent} from '@product/page';

const routes: Routes = [{
    path: '',
    component: ProductRouterComponent,
    children: [{
        path: '',
        component: ProductHomePageComponent
    }, {
        path: 'detail/:id',
        component: ProductDetailPageComponent
    }, {
        path: 'create',
        component: ProductCreatePageComponent
    }]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductRoutingModule {
}
