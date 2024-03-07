package io.studerd.api.common.constant;

public class ApiCodeResponse {
    //AREA auth ------------------------------------------------------------------------
    public static final String SIGNUP_ERROR = "api.signup.error";
    public static final String SIGNUP_CODE_ERROR = "api.signup.code-error";
    public static final String SIGNUP_SUCCESS = "api.signup.success";
    public static final String SIGNUP_ERROR_ALREADY_EXIST = "api.signup.error.all-ready-exist";
    public static final String REFRESH_ERROR = "api.refresh.error.not-refreshed";
    public static final String REFRESH_SUCCESS = "api.refresh.success.refresh-success";
    public static final String REFRESH_CANT_FOUND_USER_CLAIM = "api.refresh.error.cant-found-user-claim";
    public static final String REFRESH_USER_INVALID = "api.refresh.error.user-invalid";
    public static final String REFRESH_IS_EXPIRED = "api.refresh.error.is-expired";
    public static String ME_SYSTEM_ERROR = "api.me.error.system";
    public static String CHANGE_SUCCESS = "api.change-password.success";
    public static String ME_SUCCESS = "api.me.success.data-retrieved";
    public static String SIGNIN_SYSTEM_ERROR = "api.signin.error.system";
    public static String SIGNIN_NOT_FOUND = "api.signin.error.not-found";
    public static String SIGNIN_SUCCESS = "api.signin.success.can-connect";
    //END AREA auth --------------------------------------------------------------------
    // Profile AREA ---------------------------------------------------------------------
    public static String PROFILE_LIST_SUCCESS ="api.profile.list-succcess";
    public static String PROFILE_NOT_FOUND ="api.profile.not-found";
    public static String PROFILE_FOUND ="api.profile.found";
    public static String PROFILE_CREATE_ERROR ="api.profile.create-error";
    public static String PROFILE_CREATE_SUCCESS ="api.profile.create-succcess";
    public static String PROFILE_UPDATE_ERROR ="api.profile.update-error";
    public static String PROFILE_UPDATE_SUCCESS ="api.profile.update-succcess";
    public static String PROFILE_DELETE_ERROR ="api.profile.delete-error";
    public static String PROFILE_DELETE_SUCCESS ="api.profile.delete-succcess";
    
    public static String PRODUCT_LIST_SUCCESS ="api.product.list-succcess";
    public static String PRODUCT_NOT_FOUND ="api.product.not-found";
    public static String PRODUCT_FOUND ="api.product.found";
    public static String PRODUCT_CREATE_ERROR ="api.product.create-error";
    public static String PRODUCT_CREATE_SUCCESS ="api.product.create-succcess";
    public static String PRODUCT_UPDATE_ERROR ="api.product.update-error";
    public static String PRODUCT_UPDATE_SUCCESS ="api.product.update-succcess";
    public static String PRODUCT_DELETE_ERROR ="api.product.delete-error";
    public static String PRODUCT_DELETE_SUCCESS ="api.product.delete-succcess";
    
    public static String ORDER_LIST_SUCCESS ="api.order.list-succcess";
    public static String ORDER_NOT_FOUND ="api.order.not-found";
    public static String ORDER_FOUND ="api.order.found";
    public static String ORDER_CREATE_ERROR ="api.order.create-error";
    public static String ORDER_CREATE_SUCCESS ="api.order.create-succcess";
    public static String ORDER_UPDATE_ERROR ="api.order.update-error";
    public static String ORDER_UPDATE_SUCCESS ="api.order.update-succcess";
    public static String ORDER_FINALIZE_ERROR ="api.order.finalize-error";
    public static String ORDER_FINALIZE_SUCCESS ="api.order.finalize-succcess";
    public static String ORDER_CANCEL_ERROR ="api.order.cancel-error";
    public static String ORDER_CANCEL_SUCCESS ="api.order.cancel-succcess";
    public static String ORDER_DELETE_ERROR ="api.order.delete-error";
    public static String ORDER_DELETE_SUCCESS ="api.order.delete-succcess";
    
}
