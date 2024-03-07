import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderRouterComponent } from '@order/router';
import { OrderHomePageComponent , OrderCreatePageComponent, OrderDetailPageComponent } from '@order/page';
import { OrderFormComponent } from '@order/component';
import {CardModule} from '@shared/module/card/card.module';
import {TranslateModule} from '@ngx-translate/core';
import {TooltipModule} from '@shared/module/tooltip/tooltip.module';
import { OrderProductionPageComponent } from './page/order-production-page/order-production-page.component';
import {FormsModule} from '@angular/forms';
import {NgxPrintModule} from 'ngx-print';


@NgModule({
  declarations: [
    OrderRouterComponent,
    OrderHomePageComponent,
    OrderCreatePageComponent,
    OrderDetailPageComponent,
    OrderFormComponent,
    OrderProductionPageComponent
  ],
    imports: [
        CommonModule,
        OrderRoutingModule,
        CardModule,
        TranslateModule,
        TooltipModule,
        FormsModule,
        NgxPrintModule
    ]
})
export class OrderModule { }
