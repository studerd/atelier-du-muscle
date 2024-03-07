import {Dto} from '@shared/model';
import {ProductDto, ProductOptionDto} from '@product/model/dto';

export interface OrderLineDto extends Dto {
  order_line_id: string;
  product: ProductDto;
  options: ProductOptionDto[];
  totalPrice: number;
  qty: number;
}
