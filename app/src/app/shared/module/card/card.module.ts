import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '@shared/module/card/component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [CardComponent],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [CardComponent]
})
export class CardModule {
}
