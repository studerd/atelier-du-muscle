import {Business} from '@shared/model';
import {ProductImage, ProductOption} from '@product/model';

export interface Product extends Business {
    pictures: ProductImage[];
    title: string;
    capacity: number;
    countCapacity: number;
    price: number;
    delays: string;
    options: ProductOption[];
    hook:string;
    characteristic:string;
    description: string;
    technicalData:string;
    complement:string;
    draft:boolean;
    visible:boolean;
    small:boolean;
    costTravel:number;
    position:number;
}