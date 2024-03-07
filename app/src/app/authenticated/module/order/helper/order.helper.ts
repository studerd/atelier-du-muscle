import {Order, OrderCreatePayload, OrderDto, OrderLine, OrderLineDto, OrderStatus, OrderUpdatePayload} from '../model';

import {OrderLineHelper} from './order-line.helper';
import {isNil} from 'lodash';
import {profileHelper} from '@profile/helper/profile.helper';
import {addressHelper} from '@address/helper';
import {addWeeks, parseISO,format} from 'date-fns';

export class OrderHelper {
    public static businessToCreatePayload(business: Order): OrderCreatePayload {
        return {
            comment: business.comment,
            lines: business.lines.map((o: OrderLine) => OrderLineHelper.toUpdatePayload(o)),
            profile: {profile_id: business.profile.id},
            reference: business.reference,
            status: business.status

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
            delivryAddress: {address_id: business.delivryAddress.id},
            trackingURL: business.trackingURL

        }
    }

    public static fromDTO(dto: OrderDto): Order {
        let profile = profileHelper.fromDTO(dto.profile);
        const sp = isNil(dto.statusUpdate) ? new Date() : parseISO(dto.statusUpdate.toString());
        let order: Order = {
            startProduction: format(sp, 'dd-MM-yyyy'),
            estimatedTimeToDeliver: format(addWeeks(sp,8), 'dd-MM-yyyy'),
            trackingURL: dto.trackingURL,
            comment: dto.comment,
            encoded: OrderHelper.getDate(dto.encoded),
            id: dto.client_order_id,
            isEmpty: false,
            lastUpdate: dto.lastUpdate,
            lines: dto.lines.map((line: OrderLineDto) => OrderLineHelper.fromDTO(line)),
            profile: profile,
            reference: dto.reference,
            status: dto.status,
            str: dto.reference,
            bigStr: `Commande ${dto.reference} de ${profile.str}`,
            littleStr: `Livraison : ${addressHelper.fromDTO(dto.billingAddress).str}, tel: ${profile.phone} , mail: ${profile.email}`,

            totalPrice: 0,
            estimatedCost: 0,
            billingAddress: addressHelper.fromDTO(dto.billingAddress),
            delivryAddress: addressHelper.fromDTO(dto.delivryAddress)
        }
        const delays = order.lines.map((l: OrderLine) => l.product.delays);
        order.str = order.lines.map((l: OrderLine) => l.str).join(',');
        order.str = (order.str.length > 30) ? order.str.slice(0, 30 - 1) + '...' : order.str;
        order.totalPrice = OrderHelper.getTotalPrice(order);
        order.estimatedCost = OrderHelper.calculateEstimatedCost(order);
        return order;
    }

    public static toDTO(business: Order): OrderDto {
        return {
            trackingURL: business.trackingURL,
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
            statusUpdate:new Date(business.startProduction)
        }
    }

    public static getEmpty(): Order {
        return {
            bigStr: '',
            str: '',
            littleStr: '',
            startProduction: '',
            estimatedTimeToDeliver: '',
            trackingURL: '',
            comment: '',
            encoded: undefined,
            id: '',
            isEmpty: true,
            lastUpdate: undefined,
            lines: [],
            profile: profileHelper.getEmpty(),
            reference: '',
            status: OrderStatus.CLIENT_NOT_PAID,
            totalPrice: 0,
            estimatedCost: 0,
            billingAddress: addressHelper.getEmpty(),
            delivryAddress: addressHelper.getEmpty()
        }
    }
}
