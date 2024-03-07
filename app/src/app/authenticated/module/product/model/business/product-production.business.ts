import {Product, ProductionOption} from '@product/model';
import {Profile} from '@profile/model';

export interface ProductProduction {
    reference: string;
    profile: Profile;
    qty:number;
    product:string;
    options: ProductionOption[];
    str: string;
    littleStr:string;
}
export interface ProductProductionGroup{
    product:string;
    qty:number;
}