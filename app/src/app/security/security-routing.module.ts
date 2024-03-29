import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SigninComponent, SignupComponent} from '@security/page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full',
  }, {
    path: 'signin',
    component: SigninComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule {
}
