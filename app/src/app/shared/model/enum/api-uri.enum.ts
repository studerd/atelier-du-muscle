export enum ApiUri {
    SIGNIN = 'auth/signin',
    SIGNUP = 'auth/signup',
    ME = 'auth/me',
    REFRESH_TOKEN = 'auth/refresh',

    PROFILE_LIST = 'profile/list',
    PROFILE_DETAIL = 'profile/detail/',
    PROFILE_CREATE = 'profile/create',
    PROFILE_UPDATE = 'profile/update',
    PROFILE_DELETE = 'profile/delete/',

    PRODUCT_LIST = 'product/list',
    PRODUCT_DETAIL = 'product/detail/',
    PRODUCT_CREATE = 'product/create',
    PRODUCT_UPDATE = 'product/update',
    PRODUCT_DELETE = 'product/delete/',
    PRODUCT_DELETE_PICTURE = 'product/delete-picture/',

    ORDER_LIST = 'order/list',
    ORDER_LIST_STATUS = 'order/list-status/',
    ORDER_DETAIL = 'order/detail/',
    ORDER_CREATE = 'order/create',
    ORDER_UPDATE = 'order/update',
    ORDER_CHANGE_STATUS = 'order/change-status',
    ORDER_DELETE = 'order/delete/',
}
