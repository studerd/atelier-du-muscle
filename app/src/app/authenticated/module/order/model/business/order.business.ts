import {Business} from '@shared/model';
import {OrderLine, OrderStatus} from '@order/model';
import {Profile} from '@profile/model';
import {Address} from '@address/model';

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
    trackingURL: string;
    str: string;
    bigStr: string;
    littleStr: string;
    startProduction: string;
    estimatedTimeToDeliver: string;
}
