import {Payload} from '@shared/model';
import {OrderLineDto, OrderStatus} from '@order/model';
import {AddressDto} from '@address/model';
import {ProfileDto} from '@profile/model';

export interface OrderUpdatePayload extends Payload {
  client_order_id: string;
  reference: string;
  profile: Partial<ProfileDto>;
  status: OrderStatus;
  comment: string;
  lines: OrderLineDto[];
  billingAddress: Partial<AddressDto>;
  delivryAddress: Partial<AddressDto>;
  trackingURL:string;

}
