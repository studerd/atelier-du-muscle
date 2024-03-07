import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  BucketPageComponent,
  ContactPageComponent,
  HomePageComponent,
  ShopPageComponent,
  WorkPageComponent
} from './page';
import {PublicGuard, SecurityGuard} from '@security/guard';
import {OrderLandingPageComponent} from '@order/page';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'work',
    component: WorkPageComponent
  },
  {
    path: 'shop',
    component: ShopPageComponent
  },
  {
    path: 'bucket',
    component: BucketPageComponent
  }, {
    path: 'landing/:id',
    component: OrderLandingPageComponent
  },
  {
    path: 'contact',
    component: ContactPageComponent
  }, {
    path: 'account',
    canActivate: [SecurityGuard],
    loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule)
  }, {
    path: 'order',
    canActivate: [SecurityGuard],
    loadChildren: () => import('./modules/order/order.module').then(m => m.OrderModule)
  }, {
    path: 'acc',
    canActivate: [PublicGuard],
    loadChildren: () => import('./security/security.module').then(m => m.SecurityModule)
  }, {
    path: 'product',
    loadChildren: () => import('./modules/product/product.module').then(m => m.ProductModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
