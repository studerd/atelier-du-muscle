import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileRouterComponent} from '@profile/router';
import {ProfileCreatePageComponent, ProfileDetailPageComponent, ProfileHomePageComponent} from '@profile/page';

const routes: Routes = [{
    path: '',
    component: ProfileRouterComponent,
    children: [{
        path: '',
        component: ProfileHomePageComponent
    }, {
        path: 'detail/:id',
        component: ProfileDetailPageComponent
    }, {
        path: 'create',
        component: ProfileCreatePageComponent
    }]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProfileRoutingModule {
}
