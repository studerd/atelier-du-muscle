import {Injectable} from '@angular/core';
import {CrudService} from '@shared/service/crud.service';
import {productHelper} from '@product/helper';
import {Product, ProductCreatePayload, ProductDetailFormConfig, ProductDto, ProductUpdatePayload} from '@product/model';

@Injectable({
    providedIn: 'root'
})
export class ProductService extends CrudService<Product, ProductDto, string, ProductCreatePayload, ProductUpdatePayload, ProductDetailFormConfig> {
    override helper = productHelper;
    override entityName = 'PRODUCT';
}