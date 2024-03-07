package io.studerd.api.security.credential.entity.request;

import io.studerd.api.common.config.Role;
import io.studerd.api.common.config.SignupCodeCreation;
import io.studerd.api.common.entity.ApiResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignupRequest {
    private String username;
    private String password;
    private List<Role> role;
    private String code;

    public ApiResponse isValid() {
        if (code == null) {
            return new ApiResponse(false, null, "api.signup.code-creator-missing");
        }
        this.role = new ArrayList<>();
        if (code.equals(SignupCodeCreation.USER.role.getCode())) {
            this.role.add(SignupCodeCreation.USER.role);
        } else if (code.equals(SignupCodeCreation.ADMIN.role.getCode())) {
            this.role.add(SignupCodeCreation.ADMIN.role);
        }
        if (username == null || username.isEmpty()) {
            if (password == null || password.isEmpty()) {
                return new ApiResponse(false, null, "api.signup.valid-error-full");
            } else {
                return new ApiResponse(false, null, "api.signup.valid-error-email");
            }
        } else if (password == null || password.isEmpty()) {
            return new ApiResponse(false, null, "api.signup.valid-error-password");
        } else {
            return new ApiResponse(true, this, null);
        }
    }
}
