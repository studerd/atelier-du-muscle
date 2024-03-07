package io.studerd.api.module.profile.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.studerd.api.common.entity.enums.Gender;
import io.studerd.api.module.address.entity.Address;
import io.studerd.api.module.order.entity.ClientOrder;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.util.List;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Profile {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "profile_id", updatable = false, nullable = false)
    private UUID profile_id;
    private String firstname;
    private String lastname;
    private String phone;
    private String email;
    private Gender gender;
    private String vatNumber;
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "profile_id_fk", referencedColumnName = "profile_id")
    List<Address> address;
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "profile_id_fk", referencedColumnName = "profile_id")
    List<ClientOrder> orders;
    // this is handled by the system not by the client
    @JsonIgnore
    private String creatorCode;
    @JsonIgnore
    private boolean creatorCodeIsUsed;
    
    @JsonIgnore
    private boolean deleted;
}
