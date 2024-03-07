import {OrderLine, OrderLineDto, OrderLineUpdatePayload} from '../model';
import {productHelper} from '@product/helper';
import {ProductOptionHelper} from '@product/helper/product-option.helper';
import {ProductOption, ProductOptionDto} from '@product/model';

export class OrderLineHelper {

  public static fromDTO(dto: OrderLineDto): OrderLine {
    const data: OrderLine = {
      id: dto.order_line_id,
      isEmpty: false,
      options: dto.options.map((o: ProductOptionDto) => ProductOptionHelper.fromDTO(o)),
      product: productHelper.fromDTO(dto.product),
      str: dto.options.map((o: ProductOptionDto) => o.title).join(','),
      totalPrice: dto.totalPrice,
      qty: dto.qty,
      uniqueOptionIdentifer: ''

    }
    data.uniqueOptionIdentifer = ProductOptionHelper.toUniqueIdentifierOption(data.options);
    return data;
  }

  public static toDTO(business: OrderLine): OrderLineDto {
    return {
      options: business.options.map((o: ProductOption) => ProductOptionHelper.fromDTO(o)),
      order_line_id: business.id,
      product: productHelper.toDTO(business.product),
      totalPrice: business.totalPrice,
      qty: business.qty

    }
  }

  public static toUpdatePayload(business: OrderLine): OrderLineUpdatePayload {
    return {
      options: business.options.map((o: ProductOption) => {
        return {product_option_id: o.id}
      }),
      order_line_id: business.id,
      product: {product_id: business.product.id},
      totalPrice: business.totalPrice,
      qty: business.qty

    }
  }

  public static getEmpty(): OrderLine {
    return {
      id: '',
      isEmpty: true,
      options: [],
      product: productHelper.getEmpty(),
      str: '',
      totalPrice: 0,
      qty: 0,
      uniqueOptionIdentifer: ''

    }
  }
}
