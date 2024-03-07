import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastContainerComponent } from './component/toast-container/toast-container.component';
import { ToastComponent } from './component/toast/toast.component';
import {TranslateModule} from '@ngx-translate/core';



@NgModule({
    declarations: [
        ToastContainerComponent,
        ToastComponent
    ],
    exports: [
        ToastContainerComponent
    ],
    imports: [
        CommonModule,
        TranslateModule
    ]
})
export class ToastModule { }
