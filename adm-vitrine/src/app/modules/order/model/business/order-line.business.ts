import {Business} from '@shared/model';
import {Product, ProductOption} from '@product/model';

export interface OrderLine extends Business{
  product: Product;
  options: ProductOption[];
  uniqueOptionIdentifer:string;
  totalPrice: number;
  qty: number;
}
