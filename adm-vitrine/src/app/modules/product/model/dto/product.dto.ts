import {Dto} from '@shared/model';
import {ProductImageDto} from '@product/model/dto/product-image.dto';
import {ProductOptionDto} from '@product/model/dto/product-option.dto';

export interface ProductDto extends Dto {
  product_id: string;
  pictures: ProductImageDto[];
  title: string;
  capacity: number;
  countCapacity: number;
  price: number;
  delays: string;
  hook: string;
  options: ProductOptionDto[];
  characteristic: string;
  description: string;
  technicalData: string;
  complement: string;
  draft: boolean;
  visible: boolean;
  small: boolean;
  costTravel: number;
}
