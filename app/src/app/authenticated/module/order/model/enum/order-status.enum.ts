export enum OrderStatus {
    ALL = 'ALL',
    CLIENT_PAID = 'CLIENT_PAID',
    CLIENT_NOT_PAID = 'CLIENT_NOT_PAID',
    WAITING_CLIENT_FINALIZATION = 'WAITING_CLIENT_FINALIZATION',
    CANCELED_BY_CLIENT = 'CANCELED_BY_CLIENT',
    IN_PRODUCTION = 'IN_PRODUCTION',
    IN_DELIVERY = 'IN_DELIVERY',
    DELIVRED = 'DELIVRED'
}

export const statusArr = [
    OrderStatus.ALL,
    OrderStatus.CLIENT_NOT_PAID,
    OrderStatus.CLIENT_PAID,
    OrderStatus.IN_PRODUCTION,
    OrderStatus.IN_DELIVERY,
    OrderStatus.DELIVRED
]
export const statusChangeArr = [
    OrderStatus.CLIENT_NOT_PAID,
    OrderStatus.CLIENT_PAID,
    OrderStatus.IN_PRODUCTION,
    OrderStatus.IN_DELIVERY,
    OrderStatus.DELIVRED
]