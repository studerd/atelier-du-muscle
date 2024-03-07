import {Dto, Payload} from '@shared/model';

export interface ProductOptionUpdatePayload extends Payload{
    product_option_id:string;
    title:string;
    description:string;
    amePriceAsParent:boolean;
    percentMore:number;
    price:number;
    type:string
}