package io.studerd.api.module.order.service;

import io.studerd.api.common.contract.CrudService;
import io.studerd.api.common.entity.ApiResponse;
import io.studerd.api.module.order.entity.ClientOrder;
import io.studerd.api.module.order.entity.payload.MailData;
import io.studerd.api.module.order.entity.payload.MolliePaymentPayload;
import io.studerd.api.module.order.entity.payload.OrderCreatePayload;
import io.studerd.api.module.order.entity.payload.OrderUpdatePayload;

import java.security.Principal;
import java.util.List;
import java.util.UUID;

public interface OrderService extends CrudService<ClientOrder, UUID, OrderCreatePayload, OrderUpdatePayload> {
    List<ClientOrder> listForProfile(UUID uuid);
    List<ClientOrder> listForStatus(String status);
    boolean cancel(UUID uuid);
    ApiResponse mail(MailData data);
    ClientOrder finalize(OrderUpdatePayload data, Principal principal);
    ClientOrder changeStatus(OrderUpdatePayload payload);

    void getNoValidateOrder();
    void getNoPaymentOrder();
    ApiResponse paid(Principal principal, MolliePaymentPayload request);
    ApiResponse webhook(UUID id);
}
