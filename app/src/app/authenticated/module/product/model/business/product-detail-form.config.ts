import {Business, DetailForm} from '@shared/model';
import { FormInputConfig } from '@shared/module/form/model';

export interface ProductDetailFormConfig extends DetailForm{
    title: FormInputConfig<Business>;
    capacity: FormInputConfig<Business>;
    countCapacity: FormInputConfig<Business>;
    description: FormInputConfig<Business>;
    price: FormInputConfig<Business>;
    delays: FormInputConfig<Business>;
    draft: FormInputConfig<Business>;
    visible: FormInputConfig<Business>;
    small:FormInputConfig<Business>;
    costTravel:FormInputConfig<Business>;
    position:FormInputConfig<Business>;
}