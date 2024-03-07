import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import {ProductFormComponent} from '@product/component';
import {ProductCreatePageComponent, ProductDetailPageComponent, ProductHomePageComponent} from '@product/page';
import {ProductRouterComponent} from '@product/router';
import {DataViewModule} from '@shared/module/data-view/data-view.module';
import {CKEditorModule} from 'ckeditor4-angular';
import {CardModule} from '@shared/module/card/card.module';
import {FormModule} from '@shared/module/form/form.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import { ProductPictureChooserComponent } from './component/product-picture-chooser/product-picture-chooser.component';
import {ImageCropperModule} from 'ngx-image-cropper';
import { ProductPictureItemComponent } from './component/product-picture-item/product-picture-item.component';

@NgModule({
  declarations: [
    ProductFormComponent,
    ProductCreatePageComponent,
    ProductDetailPageComponent,
    ProductHomePageComponent,
    ProductRouterComponent,
    ProductPictureChooserComponent,
    ProductPictureItemComponent
  ],
    imports: [
        CommonModule,
        ProductRoutingModule,
        DataViewModule,
        CKEditorModule,
        CardModule,
        FormModule,
        ReactiveFormsModule,
        TranslateModule,
        FormsModule,
        ImageCropperModule
    ]
})
export class ProductModule { }
