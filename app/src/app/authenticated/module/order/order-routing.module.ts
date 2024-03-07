import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrderRouterComponent} from '@order/router';
import {
    OrderCreatePageComponent,
    OrderDetailPageComponent,
    OrderHomePageComponent,
    OrderProductionPageComponent
} from '@order/page';

const routes: Routes = [{
    path: '',
    component: OrderRouterComponent,
    children: [{
        path: '',
        component: OrderHomePageComponent
    }, {
        path: 'production',
        component: OrderProductionPageComponent
    }, {
        path: 'detail/:id',
        component: OrderDetailPageComponent
    }, {
        path: 'create',
        component: OrderCreatePageComponent
    }]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrderRoutingModule {
}
