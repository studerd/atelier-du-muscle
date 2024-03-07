import {Business, Dto} from '@shared/model';

export interface ProductOption extends Business{
    product_option_id:string;
    title:string;
    description:string;
    samePriceAsParent:boolean;
    percentMore:number;
    price:number;
    type:string;
    selected:boolean;
}