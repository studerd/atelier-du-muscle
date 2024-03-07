import {Payload} from '@shared/model';
import {AddressDto, ProfileDto} from '@account/model';
import {OrderLineUpdatePayload, OrderStatus} from '@order/model';

export interface OrderCreatePayload extends Payload {
  reference: string;
  profile: Partial<ProfileDto>;
  status: OrderStatus;
  comment: string;
  lines: OrderLineUpdatePayload[];
  billingAddress: AddressDto;
  delivryAddress: AddressDto
}
