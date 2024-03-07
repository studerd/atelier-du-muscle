import {Payload} from '@shared/model';
import {AddressDto, ProfileDto} from '@account/model';
import {OrderLineDto, OrderStatus} from '@order/model';

export interface OrderUpdatePayload extends Payload {
  client_order_id: string;
  reference: string;
  profile: Partial<ProfileDto>;
  status: OrderStatus;
  comment: string;
  lines: OrderLineDto[];
  billingAddress: Partial<AddressDto>;
  delivryAddress: Partial<AddressDto>;

}
