import {ProductImage, ProductImageDto} from '@product/model';

export class ProductImageHelper {
    public static getEmpty(position:number =0): ProductImage {
        return {
            id: '', isEmpty: true, str: '',
            path: '', content: '',
            position:position
        }
    }
    public static fromDTO(dto:ProductImageDto):ProductImage{
        return {
            content: dto.content,
            id: dto.product_image_id,
            isEmpty: false,
            path: dto.path,
            str: '',
            position:dto.position
        }
    }
}