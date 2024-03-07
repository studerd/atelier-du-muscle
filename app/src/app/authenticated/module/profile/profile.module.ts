import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProfileRoutingModule} from './profile-routing.module';
import {ProfileCreatePageComponent, ProfileDetailPageComponent, ProfileHomePageComponent} from '@profile/page';
import {CardModule} from '@shared/module/card/card.module';
import {TranslateModule} from '@ngx-translate/core';
import {FormModule} from '@shared/module/form/form.module';
import {ProfileRouterComponent} from '@profile/router';
import {DataViewModule} from '@shared/module/data-view/data-view.module';
import {TooltipModule} from '@shared/module/tooltip/tooltip.module';
import {ProfileFormComponent} from '@profile/component';
import {AddressModule} from '@address/address.module';


@NgModule({
    declarations: [
        ProfileRouterComponent,
        ProfileHomePageComponent,
        ProfileDetailPageComponent,
        ProfileCreatePageComponent,
        ProfileFormComponent
    ],
    imports: [
        CommonModule,
        ProfileRoutingModule,
        DataViewModule,
        CardModule,
        TranslateModule,
        FormModule,
        TooltipModule,
        AddressModule
    ]
})
export class ProfileModule {
}
