import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {
    DataViewerDetailComponent,
    DataViewerRouterComponent,
    DataTabViewComponent,
    DataViewerLoaderComponent,
    DataViewerTableComponent, DataViewerHomeComponent
} from './component';
import {TranslateModule} from '@ngx-translate/core';
import {TooltipModule} from '@shared/module/tooltip/tooltip.module';
import {ReactiveFormsModule} from '@angular/forms';
import {CardModule} from '@shared/module/card/card.module';



@NgModule({
    declarations: [
        DataViewerRouterComponent,
        DataTabViewComponent,
        DataViewerDetailComponent,
        DataViewerLoaderComponent,
        DataViewerTableComponent,
        DataViewerHomeComponent
    ],
    exports: [
        DataViewerRouterComponent,
        DataViewerLoaderComponent,
        DataViewerTableComponent,
        DataViewerHomeComponent
    ],
    imports: [
        CommonModule,
        RouterOutlet,
        TranslateModule,
        TooltipModule,
        ReactiveFormsModule,
        CardModule
    ]
})
export class DataViewModule { }
