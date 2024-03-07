import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';

import { AuthenticatedRoutingModule } from './authenticated-routing.module';
import { AuthenticatedRouterComponent } from '@dashboard/router';
import { HomePageComponent } from '@dashboard/page';
import {TooltipModule} from '@shared/module/tooltip/tooltip.module';


@NgModule({
  declarations: [
    AuthenticatedRouterComponent,
    HomePageComponent
  ],
    imports: [
        CommonModule, TranslateModule,
        AuthenticatedRoutingModule, TooltipModule
    ]
})
export class AuthenticatedModule { }
