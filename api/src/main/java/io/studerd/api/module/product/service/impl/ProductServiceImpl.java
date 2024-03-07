package io.studerd.api.module.product.service.impl;

import io.studerd.api.module.product.entity.Product;
import io.studerd.api.module.product.entity.ProductImage;
import io.studerd.api.module.product.entity.payload.ProductCreatePayload;
import io.studerd.api.module.product.entity.payload.ProductUpdatePayload;
import io.studerd.api.module.product.repository.ProductImageRepository;
import io.studerd.api.module.product.repository.ProductRepository;
import io.studerd.api.module.product.service.ProductService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FileUtils;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ProductServiceImpl implements ProductService {
    public final ProductRepository repository;
    public final ProductImageRepository imageRepository;
    private final String folder = "pictures/";

    @Override
    public List<Product> list() {
        try {
            return this.repository.findAll();
        } catch (Exception e) {
            log.error("[ProductService - list] " + e.getMessage());
            return new ArrayList<>();
        }
    }

    @Override
    public List<Product> publicList() {
        try {
            return this.repository.productList();
        } catch (Exception e) {
            log.error("[ProductService - list] " + e.getMessage());
            return new ArrayList<>();
        }
    }

    @Override
    public boolean deletePicture(UUID pictureId) {
        try {
            this.imageRepository.findById(pictureId).ifPresent(this.imageRepository::delete);
            return true;
        } catch (Exception e) {
            log.error("[ProductService - list] " + e.getMessage());
            return false;
        }
    }

    @Override
    public Product detail(UUID uuid) {
        try {
            return this.repository.findById(uuid).orElse(null);
        } catch (Exception e) {
            log.error("[ProductService - detail] " + e.getMessage());
            return null;
        }
    }

    @Override
    public Product create(ProductCreatePayload payload) {
        try {
            Product newProduct = Product.builder()
                    .capacity(payload.getCapacity())
                    .characteristic(payload.getCharacteristic())
                    .complement(payload.getComplement())
                    .countCapacity(payload.getCountCapacity())
                    .delays(payload.getDelays())
                    .description(payload.getDescription())
                    .hook(payload.getHook())
                    .options(payload.getOptions())
                    .position(payload.getPosition())

                    .small(payload.isSmall())
                    .costTravel(payload.getCostTravel())
                    .price(payload.getPrice())
                    .title(payload.getTitle())
                    .technicalData(payload.getTechnicalData())
                    .draft(payload.isDraft())
                    .visible(payload.isVisible())
                    .build();
            newProduct = this.repository.save(newProduct);
            this.handlePictures(newProduct, payload.getPictures());
            return newProduct;
        } catch (Exception e) {
            log.error("[ProductService - create] " + e.getMessage());
            return null;
        }
    }

    @Override
    public Product update(ProductUpdatePayload payload) {
        try {
            Product detail = this.detail(payload.getProduct_id());
            if (detail != null) {
                detail.setCapacity(payload.getCapacity());
                detail.setCharacteristic(payload.getCharacteristic());
                detail.setComplement(payload.getComplement());
                detail.setCountCapacity(payload.getCountCapacity());
                detail.setDelays(payload.getDelays());
                detail.setDescription(payload.getDescription());
                detail.setHook(payload.getHook());
                detail.setOptions(payload.getOptions());
                detail.setPrice(payload.getPrice());
                detail.setTitle(payload.getTitle());
                detail.setTechnicalData(payload.getTechnicalData());
                detail.setSmall(payload.isSmall());
                detail.setCostTravel(payload.getCostTravel());
                detail.setPosition(payload.getPosition());
                detail.setDraft(payload.isDraft());
                detail.setVisible(payload.isVisible());
                detail = this.repository.save(detail);
                this.handlePictures(detail, payload.getPictures());
                return this.detail(payload.getProduct_id());
            }
            return null;
        } catch (Exception e) {
            log.error("[ProductService - update] " + e.getMessage());
            return null;
        }
    }

    @Override
    public boolean delete(UUID uuid) {
        try {
            Product detail = this.detail(uuid);
            if (detail != null) {
                this.repository.delete(detail);
                return true;
            }
            return false;
        } catch (Exception e) {
            log.error("[ProductService - update] " + e.getMessage());
            return false;
        }
    }

    private void handlePictures(Product product, List<ProductImage> pictures) {
        List<ProductImage> images = new ArrayList<>();
        List<UUID> ids = (product.getPictures() == null) ? new ArrayList<>() : product.getPictures().stream().map(ProductImage::getProduct_image_id).collect(Collectors.toList());
        if (ids.size() > 0) {
            this.imageRepository.deleteForId(ids);
        }
        for (ProductImage picture : pictures) {
            try {
                String extension = picture.getExtension();
                if (extension != null) {

                    String path = product.getTitle() + "_" + UUID.randomUUID() + "." + extension;
                    byte[] image = Base64.decodeBase64(picture.getBase64());
                    picture.setPath(path);
                    picture.setContent(null);
                    // Get the file and save it somewhere
                    File f = new File(folder + path);
                    FileUtils.writeByteArrayToFile(f, image);
                    images.add(picture);
                }
            } catch (Exception e) {
                log.error(e.getMessage());
            }
        }
        product.setPictures(images);
        repository.save(product);
    }
}
