import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModuleTopBarComponent} from '@shared/module/top-bar/component';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {TooltipModule} from '@shared/module/tooltip/tooltip.module';


@NgModule({
  declarations: [
    ModuleTopBarComponent
  ],
  exports: [
    ModuleTopBarComponent
  ],
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
        TooltipModule
    ]
})
export class TopBarModule {
}
