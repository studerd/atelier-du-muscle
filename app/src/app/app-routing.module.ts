import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PublicGuard, SecurityGuard} from '@security/guard';

const routes: Routes = [ {
  path: '',
  canActivate: [PublicGuard],
  loadChildren: () => import('./security/security.module').then(m => m.SecurityModule)
},
  {
    path: 'dashboard',
    canActivate: [SecurityGuard],
    loadChildren: () => import('./authenticated/authenticated.module').then(m => m.AuthenticatedModule)
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
