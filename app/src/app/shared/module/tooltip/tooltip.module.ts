import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TooltipComponent} from '@shared/module/tooltip/component';
import {TooltipDirective} from '@shared/module/tooltip/directive';
import {TranslateModule} from '@ngx-translate/core';


@NgModule({
  declarations: [
    TooltipComponent,
    TooltipDirective
  ],
  exports: [
    TooltipDirective
  ],
  imports: [
    CommonModule,
    TranslateModule
  ]
})
export class TooltipModule {
}
