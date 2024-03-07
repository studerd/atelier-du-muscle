package io.studerd.api.module.product.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.GenericGenerator;

import java.util.List;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Product {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "product_id", updatable = false, nullable = false)
    private UUID product_id;

    private int capacity;
    @Column(length = 6500)
    private String characteristic;
    @Column(length = 6500)
    private String complement;
    private int countCapacity;
    private String delays;
    @Column(length = 6500)
    private String description;
    private String hook;
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "product_id_fk", referencedColumnName = "product_id")
    private List<ProductOption> options;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "product_id_fk", referencedColumnName = "product_id")
    private List<ProductImage> pictures;
    private float price;
    private String title;
    @Column(length = 6500)
    private String technicalData;
    private boolean draft;
    private boolean visible;

    @ColumnDefault("false")
    private boolean small;
    @ColumnDefault("0")
    private float costTravel;
    @ColumnDefault("0")
    private int position;
}
