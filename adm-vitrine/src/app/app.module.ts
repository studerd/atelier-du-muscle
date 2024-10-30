import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {httpInterceptorProviders} from '@shared/service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ImageCropperModule} from 'ngx-image-cropper';
import {CKEditorModule} from 'ckeditor4-angular';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {ToastModule} from '@shared/module/toast/toast.module';
import {MainHeaderComponent} from './component/main-header/main-header.component';
import {
  BucketPageComponent,
  ContactPageComponent,
  HomePageComponent,
  ShopPageComponent,
  WorkPageComponent
} from './page';
import {ProductModule} from '@product/product.module';
import {BucketComponent} from './component/bucket/bucket.component';
import {HomeSliderComponent} from './component/home-slider/home-slider.component';
import {WhoWeAreComponent} from './component/who-we-are/who-we-are.component';
import {InterludeComponent} from './component/interlude/interlude.component';
import {ProductComponent} from './component/product/product.component';
import {BigBangComponent} from './component/big-bang/big-bang.component';
import {NavHeaderComponent} from './component/nav-header/nav-header.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GooglePlaceModule} from 'ngx-google-places-autocomplete';
import { InfoHomePartComponent } from './component/info-home-part/info-home-part.component';
import { BucketBagComponent } from './component/bucket-bag/bucket-bag.component';
import {FormModule} from '@shared/module/form/form.module';

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    BucketPageComponent,
    MainHeaderComponent,
    HomePageComponent,
    WorkPageComponent,
    ShopPageComponent,
    ContactPageComponent,
    BucketComponent,
    HomeSliderComponent,
    WhoWeAreComponent,
    InterludeComponent,
    ProductComponent,
    BigBangComponent,
    NavHeaderComponent,
    InfoHomePartComponent,
    BucketBagComponent
  ],
    imports: [
        BrowserModule,
        GooglePlaceModule,
        CKEditorModule,
        ImageCropperModule,
        AppRoutingModule,
        HttpClientModule,
        ToastModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        ProductModule,
        ReactiveFormsModule,
        FormModule,
        FormsModule
    ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
