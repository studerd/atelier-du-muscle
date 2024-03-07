package io.studerd.api.module.order.entity.payload;

import be.woutschoovaerts.mollie.data.common.Amount;
import be.woutschoovaerts.mollie.data.payment.PaymentMethod;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MolliePaymentPayload {
    Amount amount;
    UUID author;
    OrderCreatePayload payload;
    PaymentMethod method;
    private String payment_date;

    @Override
    public String toString() {
        return "Achat d'équipement pour un total de " + amount + " €";
    }
}