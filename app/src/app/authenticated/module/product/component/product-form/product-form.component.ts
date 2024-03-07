import {Component, Input, OnInit} from '@angular/core';
import {DataViewerDetailComponent} from '@shared/module/data-view/component';
import {FormType} from '@shared/module/form/model/enum';
import {ActivatedRoute} from '@angular/router';
import {NavigationService} from '@shared/service';
import {Product, ProductDetailFormConfig, ProductDto, ProductImage, ProductOptionGroup} from '@product/model';
import {ProductService} from '@product/service/product.service';
import {productHelper} from '@product/helper';
import {ProductOptionHelper} from '@product/helper/product-option.helper';
import {CKEditor4} from 'ckeditor4-angular';
import {ProductImageHelper} from '@product/helper/product-image.helper';
import {isNil} from 'lodash';
import {map, tap} from 'rxjs/operators';
import {AppPageEnum, Business} from '@shared/model';
import EventInfo = CKEditor4.EventInfo;

@Component({
    selector: 'app-product-form',
    templateUrl: './product-form.component.html',
    styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent extends DataViewerDetailComponent<Product, ProductDto, ProductDetailFormConfig> implements OnInit {
    override helper = productHelper
    @Input() override formMode = FormType.CREATE;
    formType = FormType;
    title: string = '';
    bulletPoints: string[] = [];
    pictures: ProductImage[] = [ProductImageHelper.getEmpty(0),
        ProductImageHelper.getEmpty(1),
        ProductImageHelper.getEmpty(2),
        ProductImageHelper.getEmpty(3),
        ProductImageHelper.getEmpty(4)];
    options: ProductOptionGroup[] = [];
    newOptions: ProductOptionGroup = ProductOptionHelper.getNewOption();
    activeTab = 0;
    tabs: string[] = ['', '', ''];

    public constructor(public activatedRouter: ActivatedRoute,
                       public nav: NavigationService,
                       public productService: ProductService) {
        super(activatedRouter, nav, productService);
    }

    override ngOnInit() {
        super.ngOnInit();
        this.detail$.subscribe((detail: Product) => {
            if (!detail.isEmpty) {
                this.bulletPoints = (isNil(detail.hook)) ? [] : detail.hook.trim().length === 0 ? [] : detail.hook.split(']').filter((h: string) => h.length > 0).map((h: string) => h.replace('[', ''));
                this.options = ProductOptionHelper.flatToGroup(detail.options);
                this.tabs = [detail.description, detail.characteristic, detail.technicalData];
                this.pictures = detail.pictures;
                let slot = 5 - this.pictures.length;
                for (let i = 0; i < slot; i++) {
                    this.pictures.push(ProductImageHelper.getEmpty());
                }
            }
        })
    }

    addStrongPoint(): void {
        if (this.title.trim().length > 0) {
            this.bulletPoints.push(this.title);
            this.title = '';
        }
    }

    removeStrongPoint(index: number) {
        this.bulletPoints.splice(index, 1);
    }

    addOptions(): void {
        if (this.newOptions.title.trim().length > 0) {
            this.options.push(this.newOptions);
            this.newOptions = {
                title: '', options: [],
                newOptionForm: ProductOptionHelper.getEmpty()
            };
        }
    }

    addValue(option: ProductOptionGroup): void {
        if (option.newOptionForm.description.trim().length > 0) {
            option.options.push(option.newOptionForm);
            option.newOptionForm = ProductOptionHelper.getEmpty();
        }
    }

    removeValueInGroup(option: ProductOptionGroup, index: number) {
        option.options.splice(index, 1);

    }

    onChange({editor}: EventInfo) {
        this.tabs[this.activeTab] = editor.getData();
    }

    preview(): void {
        let payload = this.helper.getPayload(this.detail$.getValue(), this.detailFormConfig, this.formMode);
        payload.description = this.tabs[0];
        payload.characteristic = this.tabs[1];
        payload.technicalData = this.tabs[2];
        payload.hook = (this.bulletPoints.length > 0) ? `[${this.bulletPoints.join('][')}]` : '';
        payload.options = ProductOptionHelper.groupToFlat(this.options, payload.price);
        payload.pictures = this.pictures.filter((p: ProductImage) => !p.isEmpty);
        let sub = null;
        if (this.formMode === FormType.CREATE) {
            sub = this.dataService.create(payload);
        } else if (this.formMode === FormType.UPDATE) {
            sub = this.dataService.update({...payload, product_id: this.detail$.getValue().id});
        }
        if (!isNil(sub)) {
            sub.pipe(
                map((data: Product) => data as unknown as Business),
                tap((data: Business) => {
                    this.needToSave$.next(false);
                    if (!data.isEmpty) {
                        this.dataService.list();
                        this.navigationService.navigate(`${AppPageEnum[this.dataService.entityName + '_DETAIL' as keyof typeof AppPageEnum]}/${data.id}`);
                    }
                })
            ).subscribe();
        }
    }

    deletePicture(index: number) {
        this.productService.deletePicture(this.pictures[index].id, this.detail$.getValue().id).subscribe((product: Product) => this.detail$.next(product));
    }

    removeOption(i: number) {
        this.options.splice(i,1);
    }
}
