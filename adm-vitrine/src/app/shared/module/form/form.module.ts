import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormInputComponent, InputBooleanComponent, InputDetailComponent} from './component/';


@NgModule({
    declarations: [FormInputComponent, InputDetailComponent, InputBooleanComponent],
    exports: [
        FormInputComponent,
        InputDetailComponent,
        InputBooleanComponent
    ],
    imports: [
        CommonModule,
        TranslateModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class FormModule {
}