package io.studerd.api.module.order.entity.payload;

import io.studerd.api.module.address.entity.Address;
import io.studerd.api.module.order.entity.OrderLine;
import io.studerd.api.module.profile.entity.Profile;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderCreatePayload {
    private String reference;
    private Profile profile;
    private String status;
    private String comment;
    private List<OrderLine> lines;
    private Address billingAddress;
    private Address delivryAddress;
}
