package io.studerd.api.module.order.service.impl;

import be.woutschoovaerts.mollie.Client;
import be.woutschoovaerts.mollie.ClientBuilder;
import be.woutschoovaerts.mollie.data.payment.PaymentRequest;
import be.woutschoovaerts.mollie.data.payment.PaymentResponse;
import io.studerd.api.common.constant.ApiCodeResponse;
import io.studerd.api.common.entity.ApiResponse;
import io.studerd.api.common.service.EmailService;
import io.studerd.api.module.order.entity.ClientOrder;
import io.studerd.api.module.order.entity.payload.MailData;
import io.studerd.api.module.order.entity.payload.MolliePaymentPayload;
import io.studerd.api.module.order.entity.payload.OrderCreatePayload;
import io.studerd.api.module.order.entity.payload.OrderUpdatePayload;
import io.studerd.api.module.order.repository.OrderRepository;
import io.studerd.api.module.order.service.OrderService;
import io.studerd.api.security.credential.entity.Credential;
import io.studerd.api.security.credential.service.CredentialService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class OrderServiceImpl implements OrderService {
    public final OrderRepository repository;
    public final CredentialService credentialService;
    public final EmailService emailService;

    private String apiKey = "live_U2wcV3n7F9zjgnfR8NhxB5zPvN3E4N";
    private String apiURL = "https://api.mollie.com/v2/payments";
    private String redirectUrl = "https://www.atelierdumuscle.be/landing/";
    private String webhookUrl = "https://api.atelierdumuscle.be/api/order/webhook/";

    @Override
    public ApiResponse paid(Principal principal, MolliePaymentPayload request) {
        try {
            Client client = new ClientBuilder()
                    .withApiKey(apiKey)
                    .build();
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            ClientOrder retour = this.create(request.getPayload());

            PaymentRequest req = this._getPaymentRequest(request, "" + retour.getClient_order_id());
            PaymentResponse response = client.payments().createPayment(req);
            retour.setPaymentId(response.getId());
            retour.setPaymentStatus(String.valueOf(response.getStatus()));
            repository.save(retour);
            return new ApiResponse(true, response, null);
        } catch (Exception ex) {
            ex.printStackTrace();
            return new ApiResponse(false, null, ex.getMessage());
        }
    }

    @Override
    public ApiResponse webhook(UUID id) {
        try {
            Client client = new ClientBuilder()
                    .withApiKey(apiKey)
                    .build();
            ClientOrder accountOrder = repository.findById(id).orElse(null);
            this.emailService.sendToNico(accountOrder);
            if (accountOrder != null) {
                if (!accountOrder.getPaymentStatus().equals("PAID")) {
                    PaymentResponse response = client.payments().getPayment(accountOrder.getPaymentId());
                    System.out.println("Webhook Command status :" + response.getStatus());
                    System.out.println("------------------------------------------------------");
                    accountOrder.setPaymentStatus(String.valueOf(response.getStatus()));
                    if (String.valueOf(response.getStatus()).equals("PAID")) {
                        this.emailService.sendInProduction(accountOrder);
                        accountOrder.setStatus("CLIENT_PAID");
                        repository.save(accountOrder);
                        return new ApiResponse(true, response.getStatus(), "mollie.payment.status-paid");
                    } else {
                        accountOrder.setStatus("CLIENT_NOT_PAID");
                        repository.save(accountOrder);
                        return new ApiResponse(false, response.getStatus(), "mollie.payment.status-not-paid");
                    }
                } else {
                    return new ApiResponse(false, null, "mollie.payment.all-ready-treated");
                }
            } else {
                return new ApiResponse(false, null, ApiCodeResponse.ORDER_NOT_FOUND);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            return new ApiResponse(false, null, ex.getMessage());
        }
    }

    @Override
    public List<ClientOrder> list() {
        try {
            return this.repository.findAll();
        } catch (Exception e) {
            log.error("[OrderService - list] " + e.getMessage());
            return new ArrayList<>();
        }
    }

    @Override
    public ClientOrder detail(UUID uuid) {
        try {
            return this.repository.findById(uuid).orElse(null);
        } catch (Exception e) {
            log.error("[OrderService - detail] " + e.getMessage());
            return null;
        }
    }

    @Override
    public ClientOrder create(OrderCreatePayload payload) {
        try {
            ClientOrder newClientOrder = ClientOrder.builder()
                    .comment(payload.getComment())
                    .reference(RandomStringUtils.random(20, true, true))
                    .status("CLIENT_NOT_PAID")
                    // .status(payload.getStatus())
                    .statusUpdate(Timestamp.from(Instant.now()))
                    .encoded(new Timestamp(new Date().getTime()))
                    .build();
            newClientOrder = this.repository.save(newClientOrder);
            newClientOrder.setProfile(payload.getProfile());
            newClientOrder.setDelivryAddress(payload.getDelivryAddress());
            newClientOrder.setBillingAddress(payload.getBillingAddress());
            newClientOrder.setLines(payload.getLines());
            return this.repository.save(newClientOrder);
        } catch (Exception e) {
            log.error("[OrderService - create] " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public ClientOrder changeStatus(OrderUpdatePayload payload) {
        try {
            ClientOrder detail = this.detail(payload.getClient_order_id());
            if (detail != null) {
                if (detail.getStatus().equals(payload.getStatus())) {
                    return detail;
                }

                detail.setStatusUpdate(Timestamp.from(Instant.now()));
                detail.setStatus(payload.getStatus());
                if (payload.getStatus().equals("IN_DELIVERY")) {
                    detail.setTrackingURL(payload.getTrackingURL());
                } else {
                    detail.setTrackingURL("");
                }
                this.handleChangeStatus(detail);
                return this.repository.save(detail);
            }
            return null;
        } catch (Exception e) {
            log.error("[OrderService - changeStatus] " + e.getMessage());
            return null;
        }
    }

    @Override
    public void getNoValidateOrder() {
        List<ClientOrder> orders = this.repository.getNoValidateOrder();
        for (ClientOrder order : orders) {
            this.emailService.sendDontForgetToValidate(order);
            order.setMailSended(true);
            this.repository.save(order);
        }

    }

    @Override
    public void getNoPaymentOrder() {
        List<ClientOrder> orders = this.repository.getNoPaymentOrder();
        for (ClientOrder order : orders) {
            this.emailService.sendDontForgetToPay(order);
            order.setMailSended(true);
            this.repository.save(order);
        }

    }

    @Override
    public ClientOrder update(OrderUpdatePayload payload) {
        try {
            ClientOrder detail = this.detail(payload.getClient_order_id());
            if (detail != null) {
                detail.setComment(payload.getComment());
                // detail.setReference(payload.getReference());
                // detail.setProfile(payload.getProfile());
                detail.setLines(payload.getLines());
                detail.setStatus(payload.getStatus());
                detail.setBillingAddress(payload.getBillingAddress());
                detail.setDelivryAddress(payload.getDelivryAddress());
                return this.repository.save(detail);
            }
            return null;
        } catch (Exception e) {
            log.error("[OrderService - update] " + e.getMessage());
            return null;
        }
    }

    @Override
    public boolean delete(UUID uuid) {
        try {
            ClientOrder detail = this.detail(uuid);
            if (detail != null) {
                this.repository.delete(detail);
                return true;
            }
            return false;
        } catch (Exception e) {
            log.error("[OrderService - update] " + e.getMessage());
            return false;
        }
    }

    @Override
    public List<ClientOrder> listForProfile(UUID uuid) {
        try {
            return this.repository.findAllForProfile(uuid);
        } catch (Exception e) {
            log.error("[OrderService - list] " + e.getMessage());
            return new ArrayList<>();
        }
    }

    @Override
    public List<ClientOrder> listForStatus(String status) {
        try {
            return this.repository.findAllForStatus(status);
        } catch (Exception e) {
            log.error("[OrderService - list] " + e.getMessage());
            return new ArrayList<>();
        }
    }

    @Override
    public boolean cancel(UUID uuid) {
        try {
            ClientOrder detail = this.detail(uuid);
            if (detail != null) {
                detail.setStatus("CANCELED_BY_CLIENT");
                this.repository.save(detail);
                this.handleChangeStatus(detail);
                return true;
            }
            return false;
        } catch (Exception e) {
            log.error("[OrderService - update] " + e.getMessage());
            return false;
        }
    }

    @Override
    public ApiResponse mail(MailData data) {
        try {
            this.emailService.sendMail(data);
            return new ApiResponse(true, "Votre message a bien été reçu ! Nous vous recontacterons !", "api.mail.send-error");
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ApiResponse(false, e.getMessage(), "api.mail.send-error");
        }
    }

    @Override
    public ClientOrder finalize(OrderUpdatePayload payload, Principal principal) {
        try {
            ClientOrder detail = this.detail(payload.getClient_order_id());
            Credential credential = this.credentialService.findByUsername(principal.getName());
            if (detail != null &&
                    detail.getProfile().getProfile_id().equals(payload.getProfile().getProfile_id()) &&
                    credential.getProfile().getProfile_id().equals(detail.getProfile().getProfile_id())) {
                detail.setBillingAddress(payload.getBillingAddress());
                detail.setDelivryAddress(payload.getDelivryAddress());
                detail.setStatus("WAITING_CLIENT_PAYMENT");
                this.handleChangeStatus(detail);
                return this.repository.save(detail);
            }
            return null;
        } catch (Exception e) {
            e.printStackTrace();
            log.error("[OrderService - update] " + e.getMessage());
            return null;
        }
    }

    private void handleChangeStatus(ClientOrder order) {

        switch (order.getStatus()) {
            case "CANCELED_BY_CLIENT":
                this.emailService.sendCanceled(order);
                break;
            case "IN_PRODUCTION":
                this.emailService.sendInProduction(order);
                break;
            case "IN_DELIVERY":
                this.emailService.sendWaitingInDelivery(order);
                break;
            case "WAITING_CLIENT_PAYMENT":
                this.emailService.sendWaitingPayment(order);
                break;
            case "DELIVRED":
                this.emailService.sendDelivered(order);
                break;
        }
    }

    private PaymentRequest _getPaymentRequest(MolliePaymentPayload request, String orderId) {
        PaymentRequest req = new PaymentRequest();
        req.setAmount(request.getAmount());
        req.setDescription(request.toString());
        req.setRedirectUrl(java.util.Optional.of(redirectUrl + orderId));
        req.setWebhookUrl(java.util.Optional.of(webhookUrl + orderId));
        return req;
    }
}
