package io.studerd.api.module.product.repository;

import io.studerd.api.module.product.entity.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ProductImageRepository extends JpaRepository<ProductImage, UUID> {
    @Modifying
    @Query("DELETE from ProductImage p where p.product_image_id IN :ids")
    public void deleteForId(List<UUID> ids);
}
