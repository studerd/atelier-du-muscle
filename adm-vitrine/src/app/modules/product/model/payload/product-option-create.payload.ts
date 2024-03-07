import {Payload} from '@shared/model';

export interface ProductOptionCreatePayload extends Payload {
    product_option_id: string;
    title: string;
    description: string;
    amePriceAsParent: boolean;
    percentMore: number;
    price: number;
    type: string
}