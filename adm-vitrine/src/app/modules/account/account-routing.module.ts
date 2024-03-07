import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccountRouterComponent} from './router';
import {AccountHomePageComponent} from './page';

const routes: Routes = [
  {
    path: '',
    component: AccountRouterComponent,
    children: [
      {path: '', component: AccountHomePageComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {
}
