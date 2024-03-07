import {Dto} from '@shared/model';

export interface ProductImageDto extends Dto {
    product_image_id: string;
    path: string;
    content: string;
    position:number;
}