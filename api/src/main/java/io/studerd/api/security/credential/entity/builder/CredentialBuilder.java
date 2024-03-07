package io.studerd.api.security.credential.entity.builder;

import io.studerd.api.common.config.Role;
import io.studerd.api.common.contract.Builder;
import io.studerd.api.module.profile.entity.Profile;
import io.studerd.api.security.credential.entity.Credential;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CredentialBuilder implements Builder<Credential> {

    private String username;
    private String password;
    private List<Role> roles;
    private Profile profile;
    public CredentialBuilder setUsername(String username) {
        this.username = username;
        return this;
    }

    public CredentialBuilder setPassword(String password) {
        this.password = password;
        return this;
    }

    public CredentialBuilder setProfile(Profile profile) {
        this.profile = profile;
        return this;
    }

    public CredentialBuilder setRoles(List<Role> roles) {
        this.roles = roles;
        return this;
    }

    @Override
    public Credential build() {
        return new Credential(username,password,roles,profile);
    }

}
