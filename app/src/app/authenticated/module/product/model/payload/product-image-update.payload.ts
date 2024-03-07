import {Payload} from '@shared/model';

export interface ProductImageUpdatePayload extends Payload {
    product_image_id: string;
    path: string;
}