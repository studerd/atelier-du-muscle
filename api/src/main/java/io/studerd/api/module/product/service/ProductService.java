package io.studerd.api.module.product.service;

import io.studerd.api.common.contract.CrudService;
import io.studerd.api.module.product.entity.Product;
import io.studerd.api.module.product.entity.payload.ProductCreatePayload;
import io.studerd.api.module.product.entity.payload.ProductUpdatePayload;

import java.util.List;
import java.util.UUID;

public interface ProductService extends CrudService<Product, UUID, ProductCreatePayload, ProductUpdatePayload> {
    List<Product> publicList();
    boolean deletePicture(UUID pictureId);
}
