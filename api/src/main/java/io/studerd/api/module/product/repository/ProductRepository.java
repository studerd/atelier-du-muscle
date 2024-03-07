package io.studerd.api.module.product.repository;

import io.studerd.api.module.product.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ProductRepository extends JpaRepository<Product, UUID> {
    @Query("SELECT p from Product p WHERE p.draft=false AND p.visible=true ORDER BY p.position")
    List<Product> productList();
    @Query("SELECT p from Product p  ORDER BY p.position")
    List<Product> findAll();
}
