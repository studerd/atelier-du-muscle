import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ProductImageHelper} from '@product/helper/product-image.helper';
import {ProductImage} from '@product/model';

@Component({
    selector: 'app-product-picture-item',
    templateUrl: './product-picture-item.component.html',
    styleUrls: ['./product-picture-item.component.scss']
})
export class ProductPictureItemComponent {
    @Input() image: ProductImage = ProductImageHelper.getEmpty();
    showCropper = false;
    @Output() deletePicture = new EventEmitter<void>();
    addPicture(): void {
        this.showCropper = true;
    }
    delete():void{
        this.deletePicture.emit();
    }
}
