package io.studerd.api.common.service;

import io.studerd.api.module.order.entity.ClientOrder;
import io.studerd.api.module.order.entity.payload.MailData;
import io.studerd.api.security.credential.entity.request.SignupRequest;

public interface EmailService {
    void sendWaitingInDelivery(ClientOrder order);

    void sendDelivered(ClientOrder order);

    void sendInProduction(ClientOrder order);

    void sendCanceled(ClientOrder order);

    void sendWaitingPayment(ClientOrder order);

    void sendMail(MailData data);

    void newClient(SignupRequest data);

    void sendDontForgetToValidate(ClientOrder order);
    void sendDontForgetToPay(ClientOrder order);

    void sendToNico(ClientOrder accountOrder);
}
