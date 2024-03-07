import {Payload} from '@shared/model';
import {ProductImageUpdatePayload, ProductOptionUpdatePayload} from '@product/model';

export interface ProductCreatePayload extends Payload {
    pictures: Partial<ProductImageUpdatePayload>[];
    title: string;
    capacity: number;
    countCapacity: number;
    hook:string;
    price: number;
    delays: string;
    options: Partial<ProductOptionUpdatePayload>[];
    characteristic:string;
    description: string;
    technicalData:string;
    complement:string;
    draft:boolean;
    visible:boolean;
  small:boolean;
  costTravel:number;
}
