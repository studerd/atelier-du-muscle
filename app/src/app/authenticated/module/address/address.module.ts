import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressDetailComponent } from './component/address-detail/address-detail.component';
import {CardModule} from '@shared/module/card/card.module';
import {TranslateModule} from '@ngx-translate/core';
import {FormModule} from '@shared/module/form/form.module';



@NgModule({
    declarations: [
        AddressDetailComponent
    ],
    exports: [
        AddressDetailComponent
    ],
    imports: [
        CommonModule,
        CardModule,
        TranslateModule,
        FormModule
    ]
})
export class AddressModule { }
