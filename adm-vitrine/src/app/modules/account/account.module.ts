import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AccountRoutingModule} from './account-routing.module';
import {AccountRouterComponent} from './router';
import {AccountHomePageComponent} from './page';
import {CardModule} from '@shared/module/card/card.module';
import {
  AccountAddressPartComponent,
  AccountContactPartComponent,
  AccountIdentityPartComponent,
  AccountOrderPartComponent,
  AccountParameterPartComponent,
  AccountPasswordPartComponent
} from './component';
import {TranslateModule} from '@ngx-translate/core';
import {FormModule} from '@shared/module/form/form.module';
import {GooglePlaceModule} from 'ngx-google-places-autocomplete';
import {GoogleMapsModule} from '@angular/google-maps';
import { AddressItemComponent } from './component/address-item/address-item.component';


@NgModule({
  declarations: [
    AccountHomePageComponent,
    AccountRouterComponent,
    AccountIdentityPartComponent,
    AccountContactPartComponent,
    AccountAddressPartComponent,
    AccountPasswordPartComponent,
    AccountOrderPartComponent,
    AccountParameterPartComponent,
    AddressItemComponent
  ],
  imports: [
    CommonModule,
    GoogleMapsModule,
    AccountRoutingModule,
    CardModule,
    TranslateModule,
    FormModule,
    GooglePlaceModule
  ]
})
export class AccountModule {
}
