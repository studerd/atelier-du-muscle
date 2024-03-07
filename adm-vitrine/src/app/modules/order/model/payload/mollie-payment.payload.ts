import {Amount, OrderCreatePayload, PaymentMethod} from '@order/model';

export interface MolliePaymentPayload {
  amount: Amount;
  author: string;
  payload: OrderCreatePayload;
  method: PaymentMethod;
  payment_date: string;
}
