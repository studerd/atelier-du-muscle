import {ProductDto, ProductOptionDto} from '@product/model';

export interface OrderLineUpdatePayload {
  order_line_id: string;
  product: Partial<ProductDto>;
  options: Partial<ProductOptionDto>[];
  totalPrice: number;
  qty: number;
}
