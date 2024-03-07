package io.studerd.api.security.credential.service;


import io.studerd.api.common.entity.ApiResponse;
import io.studerd.api.security.credential.entity.Credential;
import io.studerd.api.security.credential.entity.request.ChangePasswordRequest;
import io.studerd.api.security.credential.entity.request.RefreshRequest;
import io.studerd.api.security.credential.entity.request.SigninRequest;
import io.studerd.api.security.credential.entity.request.SignupRequest;

import java.security.Principal;
import java.util.UUID;

public interface CredentialService {
    ApiResponse signin(SigninRequest request);
    ApiResponse refreshToken(RefreshRequest request);
    Credential findByUsername(String username);
    ApiResponse signup(SignupRequest request);
    ApiResponse delete(Principal principal);
    ApiResponse changePassword(Principal principal,ChangePasswordRequest request);

    boolean deleteFoProfileId(UUID uuid);
}
