import {Injectable} from '@angular/core';
import {CrudService} from '@shared/service/crud.service';
import {productHelper} from '@product/helper';
import {Product, ProductCreatePayload, ProductDetailFormConfig, ProductDto, ProductUpdatePayload} from '@product/model';
import {Observable, switchMap} from 'rxjs';
import {ApiUri} from '@shared/model';

@Injectable({
    providedIn: 'root'
})
export class ProductService extends CrudService<Product, ProductDto, string, ProductCreatePayload, ProductUpdatePayload, ProductDetailFormConfig> {
    override helper = productHelper;
    override entityName = 'PRODUCT';

    public deletePicture(id: string, productId: string): Observable<Product> {
        return this.delete(ApiUri.PRODUCT_DELETE_PICTURE + id, false).pipe(
            switchMap(() => this.detail(productId))
        )
    }
}