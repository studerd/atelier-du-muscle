import {NgModule} from '@angular/core';
import {SecurityRoutingModule} from './security-routing.module';
import {SigninComponent, SignupComponent} from '@security/page';
import {CardModule} from '@shared/module/card/card.module';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {ReactiveFormsModule} from '@angular/forms';
import { LinkPartComponent } from '@security/component';

@NgModule({
    declarations: [
        SigninComponent,
        SignupComponent,
        LinkPartComponent
    ],
    imports: [
        SecurityRoutingModule,
        CardModule,
        CommonModule,
        TranslateModule,
        ReactiveFormsModule,
    ],
    providers: []
})
export class SecurityModule {
}
