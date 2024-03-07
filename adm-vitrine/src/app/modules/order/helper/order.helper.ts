import {Order, OrderCreatePayload, OrderDto, OrderLine, OrderLineDto, OrderStatus, OrderUpdatePayload} from '../model';
import {addressHelper, profileHelper} from '@account/helper';
import {OrderLineHelper} from './order-line.helper';
import {isEmpty, isNil} from 'lodash';
import {Profile} from '@account/model';

export class OrderHelper {
  public static businessToCreatePayload(business: Order): OrderCreatePayload {
    return {
      comment: business.comment,
      lines: business.lines.map((o: OrderLine) => OrderLineHelper.toUpdatePayload(o)),
      profile: {profile_id: business.profile.id},
      reference: business.reference,
      status: business.status,
      delivryAddress: addressHelper.toDTO(business.delivryAddress),
      billingAddress: addressHelper.toDTO(business.billingAddress)
    }
  }

  public static getDate(encoded: string): string {
    if (!isNil(encoded)) {
      let date = encoded.split('T')[0].split('-');
      return date[2] + '/' + date[1] + '/' + date[0];
    }
    return '';
  }

  public static getTotalPrice(order: Order): number {
    return order.lines.map(item => item.totalPrice).reduce((prev, next) => prev + next);
  }

  public static calculateEstimatedCost(order: Order): number {
    if (order.lines.length === 1) {
      return (order.lines[0] as OrderLine).product.costTravel;
    } else {
      let filter: OrderLine[] = order.lines.filter((ol: OrderLine) => !ol.product.small);
      if (filter.length === 0) {
        return 25;
      }
      return order.lines.filter((ol: OrderLine) => !ol.product.small).map(item => item.product.costTravel * item.qty).reduce((prev, next) => prev + next)
    }
  }

  public static businessToUpdatePayload(business: Order): OrderUpdatePayload {
    return {
      client_order_id: business.id,
      comment: business.comment,
      lines: business.lines.map((o: OrderLine) => OrderLineHelper.toDTO(o)),
      profile: {profile_id: business.profile.id},
      reference: business.reference,
      status: business.status,
      billingAddress: {address_id: business.billingAddress.id},
      delivryAddress: {address_id: business.delivryAddress.id}

    }
  }

  public static fromDTO(dto: OrderDto, profile: Profile): Order {
    let order: Order = {
      trackingURL: dto.trackingURL,
      comment: dto.comment,
      encoded: OrderHelper.getDate(dto.encoded),
      id: dto.client_order_id,
      isEmpty: false,
      lastUpdate: dto.lastUpdate,
      lines: dto.lines.map((line: OrderLineDto) => OrderLineHelper.fromDTO(line)),
      profile: profileHelper.fromDTO(dto.profile),
      reference: dto.reference,
      status: dto.status,
      str: dto.reference,
      totalPrice: 0,
      estimatedCost: 0,
      billingAddress: addressHelper.fromDTO(dto.billingAddress),
      delivryAddress: addressHelper.fromDTO(dto.delivryAddress),
      reduction: 0
    }
    order.totalPrice = OrderHelper.getTotalPrice(order);
    order.estimatedCost = OrderHelper.calculateEstimatedCost(order);
    order.reduction = (!isEmpty(profile.vatNumber) && !profile.vatNumber.startsWith('BE')) ? (order.totalPrice + order.estimatedCost) / 121 * 21 : 0;
    return order;
  }

  public static toDTO(business: Order): OrderDto {
    return {
      client_order_id: business.id,
      comment: business.comment,
      encoded: business.encoded,
      lastUpdate: business.lastUpdate,
      lines: business.lines.map((line: OrderLine) => OrderLineHelper.toDTO(line)),
      profile: profileHelper.toDTO(business.profile),
      reference: business.reference,
      status: business.status,
      billingAddress: addressHelper.toDTO(business.billingAddress),
      delivryAddress: addressHelper.toDTO(business.delivryAddress),
      trackingURL: business.trackingURL
    }
  }

  public static getEmpty(): Order {
    return {
      trackingURL: '',
      comment: '',
      encoded: undefined,
      id: '',
      isEmpty: true,
      lastUpdate: undefined,
      lines: [],
      profile: profileHelper.getEmpty(),
      reference: '',
      status: OrderStatus.WAITING_CLIENT_PAYMENT,
      str: '',
      totalPrice: 0,
      estimatedCost: 0,
      billingAddress: addressHelper.getEmpty(),
      delivryAddress: addressHelper.getEmpty(),
      reduction: 0
    }
  }
}
