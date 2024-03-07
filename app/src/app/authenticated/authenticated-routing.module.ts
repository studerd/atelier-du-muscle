import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticatedRouterComponent} from '@dashboard/router';

const routes: Routes = [
    {
        path: '',
        component: AuthenticatedRouterComponent,
        children: [
            {path: '', redirectTo: 'order', pathMatch: 'full'},
            {path: 'order', loadChildren: () => import('./module/order/order.module').then(m => m.OrderModule)},
            {path: 'client', loadChildren: () => import('./module/profile/profile.module').then(m => m.ProfileModule)},
            {path: 'product', loadChildren: () => import('./module/product/product.module').then(m => m.ProductModule)},

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthenticatedRoutingModule {
}
