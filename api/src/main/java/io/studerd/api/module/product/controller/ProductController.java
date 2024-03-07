package io.studerd.api.module.product.controller;

import io.studerd.api.common.constant.ApiCodeResponse;
import io.studerd.api.common.contract.CrudController;
import io.studerd.api.common.entity.ApiResponse;
import io.studerd.api.module.product.entity.Product;
import io.studerd.api.module.product.entity.payload.ProductCreatePayload;
import io.studerd.api.module.product.entity.payload.ProductUpdatePayload;
import io.studerd.api.module.product.service.ProductService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("product")
@RequiredArgsConstructor
@Tag(name = "Product", description = "Product API")
public class ProductController implements CrudController<UUID, ProductCreatePayload, ProductUpdatePayload> {
    public final ProductService service;

    @Override
    @GetMapping("list")
    public ApiResponse list() {
        return new ApiResponse(true, service.list(), ApiCodeResponse.PRODUCT_LIST_SUCCESS);
    }

    @GetMapping("public/list")
    public ApiResponse publicList() {
        return new ApiResponse(true, service.publicList(), ApiCodeResponse.PRODUCT_LIST_SUCCESS);
    }
    @GetMapping("public/detail/{id}")
    public ApiResponse publicDetail(@PathVariable("id") UUID uuid){
        Product detail = service.detail(uuid);
        if (detail == null) {
            return new ApiResponse(false, null, ApiCodeResponse.PRODUCT_NOT_FOUND);
        }
        return new ApiResponse(true, detail, ApiCodeResponse.PRODUCT_FOUND);
    }

    @Override
    @GetMapping("detail/{id}")
    public ApiResponse detail(@PathVariable("id") UUID uuid) {
        Product detail = service.detail(uuid);
        if (detail == null) {
            return new ApiResponse(false, null, ApiCodeResponse.PRODUCT_NOT_FOUND);
        }
        return new ApiResponse(true, detail, ApiCodeResponse.PRODUCT_FOUND);
    }

    @Override
    @PostMapping("create")
    public ApiResponse create(@RequestBody ProductCreatePayload payload) {
        Product created = service.create(payload);
        if (created == null) {
            return new ApiResponse(false, null, ApiCodeResponse.PRODUCT_CREATE_ERROR);
        }
        return new ApiResponse(true, created, ApiCodeResponse.PRODUCT_CREATE_SUCCESS);
    }

    @Override
    @PutMapping("update")
    public ApiResponse update(@RequestBody ProductUpdatePayload payload) {
        Product updated = service.update(payload);
        if (updated == null) {
            return new ApiResponse(false, null, ApiCodeResponse.PRODUCT_UPDATE_ERROR);
        }
        return new ApiResponse(true, updated, ApiCodeResponse.PRODUCT_UPDATE_SUCCESS);
    }

    @Override
    @DeleteMapping("delete/{id}")
    public ApiResponse delete(@PathVariable("id") UUID uuid) {
        if (!service.delete(uuid)) {
            return new ApiResponse(false, null, ApiCodeResponse.PRODUCT_DELETE_ERROR);
        }
        return new ApiResponse(true, null, ApiCodeResponse.PRODUCT_DELETE_SUCCESS);
    }
    @DeleteMapping("delete-picture/{id}")
    public ApiResponse deletePicture(@PathVariable("id") UUID uuid) {
        if (!service.deletePicture(uuid)) {
            return new ApiResponse(false, null, ApiCodeResponse.PRODUCT_DELETE_ERROR);
        }
        return new ApiResponse(true, null, ApiCodeResponse.PRODUCT_DELETE_SUCCESS);
    }
}
