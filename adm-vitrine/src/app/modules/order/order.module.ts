import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderDetailPageComponent } from '@order/page';
import {CardModule} from '@shared/module/card/card.module';
import {TranslateModule} from '@ngx-translate/core';
import {FormModule} from '@shared/module/form/form.module';
import {GooglePlaceModule} from 'ngx-google-places-autocomplete';
import { OrderLandingPageComponent } from './page/order-landing-page/order-landing-page.component';


@NgModule({
  declarations: [
    OrderDetailPageComponent,
    OrderLandingPageComponent
  ],
    imports: [
        CommonModule,
        OrderRoutingModule,
        CardModule,
        TranslateModule,
        FormModule,
        GooglePlaceModule
    ]
})
export class OrderModule { }
