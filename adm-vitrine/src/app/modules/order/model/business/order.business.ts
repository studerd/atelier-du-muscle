import {Business} from '@shared/model';
import {Address, AddressDto, Profile} from '@account/model';
import {OrderLine, OrderStatus} from '@order/model';

export interface Order extends Business {
  reference: string;
  profile: Profile;
  encoded: any;
  lastUpdate: any;
  status: OrderStatus;
  comment: string;
  lines: OrderLine[];
  totalPrice: number;
  estimatedCost: number;
  billingAddress: Address;
  delivryAddress: Address;
  trackingURL:string;
  reduction:number;
}
