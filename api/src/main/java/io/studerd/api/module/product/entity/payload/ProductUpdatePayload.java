package io.studerd.api.module.product.entity.payload;

import io.studerd.api.module.product.entity.ProductImage;
import io.studerd.api.module.product.entity.ProductOption;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductUpdatePayload {
    private UUID product_id;
    private int capacity;
    private String characteristic;
    private String complement;
    private int countCapacity;
    private String delays;
    private String description;
    private String hook;
    private List<ProductOption> options;
    private List<ProductImage> pictures;
    private float price;
    private String title;
    private String technicalData;
    private boolean draft;
    private boolean visible;
    private boolean small;
    private float costTravel;
    private int position;
}
