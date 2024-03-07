import {Dto} from '@shared/model';

export interface ProductOptionDto extends Dto{
    product_option_id:string;
    title:string;
    description:string;
    samePriceAsParent:boolean;
    percentMore:number;
    price:number;
    type:string
}