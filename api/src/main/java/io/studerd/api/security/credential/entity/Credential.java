package io.studerd.api.security.credential.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.studerd.api.common.config.Role;
import io.studerd.api.module.profile.entity.Profile;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Credential implements UserDetails {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "credential_id", updatable = false, nullable = false)
    private UUID credential_id;
    @Column(unique = true)
    private String username;
    @JsonIgnore
    private String password;
    private Boolean actif;
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "role_credential",
            joinColumns = @JoinColumn(name = "credential_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private List<Role> roles;

    @OneToOne()
    @JoinColumn(name = "profile_id_fk", referencedColumnName = "profile_id")
    Profile profile;

    // constructor used by builder
    public Credential(String username, String password, List<Role> roles,Profile profile) {
        this.username = username;
        this.password = password;
        this.actif = true;
        this.profile = profile;
        this.roles = roles;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        return roles.stream().map(r -> new SimpleGrantedAuthority(r.getName())).collect(Collectors.toList());
    }

    @JsonIgnore
    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonExpired() {
        return this.actif;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonLocked() {
        return this.actif;
    }

    @JsonIgnore
    @Override
    public boolean isCredentialsNonExpired() {
        return this.actif;
    }

    @JsonIgnore
    @Override
    public boolean isEnabled() {
        return this.actif;
    }
}
