package io.studerd.api.module.order.entity;

import io.studerd.api.module.address.entity.Address;
import io.studerd.api.module.profile.entity.Profile;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ClientOrder {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "client_order_id", updatable = false, nullable = false)
    private UUID client_order_id;
    private String reference;
    @ManyToOne()
    @JoinColumn(referencedColumnName = "profile_id", name = "profile_id_fk")
    private Profile profile;

    @CreationTimestamp
    private Timestamp encoded;
    @UpdateTimestamp
    private Timestamp lastUpdate;

    private Timestamp statusUpdate;
    @Column(columnDefinition = "boolean default false")
    private boolean mailSended = false;
    private String status;
    private String comment;
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "client_order_id_fk", referencedColumnName = "client_order_id")
    List<OrderLine> lines;
    @OneToOne()
    @JoinColumn(referencedColumnName = "address_id", name = "billing_address_id_fk")
    private Address billingAddress;
    @OneToOne()
    @JoinColumn(referencedColumnName = "address_id", name = "delivry_address_id_fk")
    private Address delivryAddress;
    @Column(length = 1000)
    private String trackingURL;

    private String paymentId;
    private String paymentStatus;
    public static float calculateEstimatedCost(ClientOrder order) {
        if (order.getLines().size() == 1) {
            return order.getLines().get(0).getProduct().getCostTravel();
        } else {
            List<OrderLine> filter = order.getLines().stream().filter(orderLine -> !orderLine.getProduct().isSmall()).toList();
            if (filter.size() == 0) {
                return 25;
            }
            return filter.stream().map(item -> item.getProduct().getCostTravel() * item.getQty()).reduce(Float::sum).get();
        }
    }
}
