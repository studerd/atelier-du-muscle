import {ProductOption} from '@product/model';

export interface ProductOptionGroups {
    data: ProductOption[],
    list: ProductOptionGroup[];
}

export interface ProductOptionGroup {
    title: string;
    options: ProductOption[];
    newOptionForm: ProductOption;
}