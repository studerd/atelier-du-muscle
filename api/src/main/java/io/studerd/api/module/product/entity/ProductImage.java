package io.studerd.api.module.product.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.io.FilenameUtils;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.GenericGenerator;

import java.io.File;
import java.nio.file.Files;
import java.util.Base64;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductImage {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "product_image_id", updatable = false, nullable = false)
    private UUID product_image_id;
    private String path;
    private String content;
    @ColumnDefault("0")
    private int position;

    public String getExtension() {
        return (this.content != null && this.content.length() > 0) ? this.content.split(";")[0].replace("data:image/", "") : null;
    }

    @JsonIgnore
    public String getBase64() {
        return (this.content != null && this.content.length() > 0) ? this.content.split(",")[1] : "";
    }

    public String getContent() {
        String base64String = null;
        try {
            File img = new File("pictures/" + this.getPath());
            String ext = FilenameUtils.getExtension(this.path);
            base64String = "data:image/" + ext + ";base64," + Base64.getEncoder().encodeToString(Files.readAllBytes(img.toPath()));

        } catch (Exception e) {
            return null;
        }
        return base64String;
    }

}
