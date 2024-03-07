package io.studerd.api.module.order.entity;

import io.studerd.api.module.product.entity.Product;
import io.studerd.api.module.product.entity.ProductOption;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.util.List;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderLine {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "order_line_id", updatable = false, nullable = false)
    private UUID order_line_id;
    @ManyToOne()
    @JoinColumn(referencedColumnName = "product_id", name = "product_id_fk")
    private Product product;
    @ManyToMany()
    private List<ProductOption> options;
    private float totalPrice;
    private int qty;
}
