import {Payload} from '@shared/model';
import {OrderLineDto, OrderLineUpdatePayload, OrderStatus} from '@order/model';
import {ProfileDto} from '@profile/model';

export interface OrderCreatePayload extends Payload {
  reference: string;
  profile: Partial<ProfileDto>;
  status: OrderStatus;
  comment: string;
  lines: OrderLineUpdatePayload[];
}
