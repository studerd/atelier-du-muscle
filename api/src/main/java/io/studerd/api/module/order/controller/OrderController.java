package io.studerd.api.module.order.controller;

import io.studerd.api.common.constant.ApiCodeResponse;
import io.studerd.api.common.contract.CrudController;
import io.studerd.api.common.entity.ApiResponse;
import io.studerd.api.module.order.entity.ClientOrder;
import io.studerd.api.module.order.entity.payload.MailData;
import io.studerd.api.module.order.entity.payload.MolliePaymentPayload;
import io.studerd.api.module.order.entity.payload.OrderCreatePayload;
import io.studerd.api.module.order.entity.payload.OrderUpdatePayload;
import io.studerd.api.module.order.service.OrderService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.UUID;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("order")
@RequiredArgsConstructor
@Tag(name = "Order", description = "Order API")
public class OrderController implements CrudController<UUID, OrderCreatePayload, OrderUpdatePayload> {
    public final OrderService service;
    @GetMapping("send-finalization")
    public ApiResponse sendFinalization(){
        try{
            this.service.getNoValidateOrder();
            return new ApiResponse(true, "Votre message a bien été reçu ! Nous vous recontacterons !", "api.mail.send-error");
        }catch(Exception e){
            return new ApiResponse(false, e.getMessage(), "api.mail.send-error");
        }
    } @GetMapping("send-wait-payment")
    public ApiResponse sendWaitPayment(){
        try{
            this.service.getNoPaymentOrder();
            return new ApiResponse(true, "Votre message a bien été reçu ! Nous vous recontacterons !", "");
        }catch(Exception e){
            return new ApiResponse(false, e.getMessage(), "api.mail.send-error");
        }
    }
    @Override
    @GetMapping("list")
    public ApiResponse list() {
        return new ApiResponse(true, service.list(), ApiCodeResponse.ORDER_LIST_SUCCESS);
    }

    @GetMapping("list/{id}")
    public ApiResponse listForProfile(@PathVariable("id") UUID uuid) {
        return new ApiResponse(true, service.listForProfile(uuid), ApiCodeResponse.ORDER_LIST_SUCCESS);
    }

    @GetMapping("list-status/{status}")
    public ApiResponse listForStatus(@PathVariable("status") String status) {
        return new ApiResponse(true, service.listForStatus(status), ApiCodeResponse.ORDER_LIST_SUCCESS);
    }

    @Override
    @GetMapping("detail/{id}")
    public ApiResponse detail(@PathVariable("id") UUID uuid) {
        ClientOrder detail = service.detail(uuid);
        if (detail == null) {
            return new ApiResponse(false, null, ApiCodeResponse.ORDER_NOT_FOUND);
        }
        return new ApiResponse(true, detail, ApiCodeResponse.ORDER_FOUND);
    }

    @Override
    @PostMapping("create")
    public ApiResponse create(@RequestBody OrderCreatePayload payload) {
        ClientOrder created = service.create(payload);
        if (created == null) {
            return new ApiResponse(false, null, ApiCodeResponse.ORDER_CREATE_ERROR);
        }
        return new ApiResponse(true, created, ApiCodeResponse.ORDER_CREATE_SUCCESS);
    }
    @GetMapping("webhook/{id}")
    public ApiResponse webhook(@PathVariable(value = "id") UUID id) {
        return service.webhook(id);
    }
    @PostMapping("paid")
    public ApiResponse paid(Principal principal,@RequestBody MolliePaymentPayload payload) {
       return service.paid(principal,payload);
    }
    @PostMapping("mail")
    public ApiResponse mail(@RequestBody MailData payload) {
      return this.service.mail(payload);
    }

    @Override
    @PutMapping("update")
    public ApiResponse update(@RequestBody OrderUpdatePayload payload) {
        ClientOrder updated = service.update(payload);
        if (updated == null) {
            return new ApiResponse(false, null, ApiCodeResponse.ORDER_UPDATE_ERROR);
        }
        return new ApiResponse(true, updated, ApiCodeResponse.ORDER_UPDATE_SUCCESS);
    }

    @PutMapping("change-status")
    public ApiResponse changeStatus(@RequestBody OrderUpdatePayload payload) {
        ClientOrder updated = service.changeStatus(payload);
        if (updated == null) {
            return new ApiResponse(false, null, ApiCodeResponse.ORDER_UPDATE_ERROR);
        }
        return new ApiResponse(true, updated, ApiCodeResponse.ORDER_UPDATE_SUCCESS);
    }

    @PutMapping("finalize")
    public ApiResponse finalize(@RequestBody OrderUpdatePayload payload, Principal principal) {
        ClientOrder updated = service.finalize(payload, principal);
        if (updated == null) {
            return new ApiResponse(false, null, ApiCodeResponse.ORDER_FINALIZE_ERROR);
        }
        return new ApiResponse(true, updated, ApiCodeResponse.ORDER_FINALIZE_SUCCESS);
    }

    @DeleteMapping("cancel/{id}")
    public ApiResponse cancel(@PathVariable("id") UUID uuid) {
        if (!service.cancel(uuid)) {
            return new ApiResponse(false, null, ApiCodeResponse.ORDER_CANCEL_ERROR);
        }
        return new ApiResponse(true, null, ApiCodeResponse.ORDER_CANCEL_SUCCESS);
    }

    @Override
    @DeleteMapping("delete/{id}")
    public ApiResponse delete(@PathVariable("id") UUID uuid) {
        if (!service.delete(uuid)) {
            return new ApiResponse(false, null, ApiCodeResponse.ORDER_DELETE_ERROR);
        }
        return new ApiResponse(true, null, ApiCodeResponse.ORDER_DELETE_SUCCESS);
    }
}
