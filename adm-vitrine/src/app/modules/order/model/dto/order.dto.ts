import {Dto} from '@shared/model';
import {AddressDto, ProfileDto} from '@account/model';
import {OrderLineDto, OrderStatus} from '@order/model';

export interface OrderDto extends Dto {
  client_order_id: string;
  reference: string;
  profile: ProfileDto;
  encoded: any;
  lastUpdate: any;
  status: OrderStatus;
  comment: string;
  lines: OrderLineDto[];
  billingAddress: AddressDto;
  delivryAddress: AddressDto;
  trackingURL:string;
}
