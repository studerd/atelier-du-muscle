package io.studerd.api.security.credential.controller;

import io.studerd.api.common.constant.ApiCodeResponse;
import io.studerd.api.common.entity.ApiResponse;
import io.studerd.api.security.config.JwtService;
import io.studerd.api.security.credential.entity.Credential;
import io.studerd.api.security.credential.entity.request.ChangePasswordRequest;
import io.studerd.api.security.credential.entity.request.RefreshRequest;
import io.studerd.api.security.credential.entity.request.SigninRequest;
import io.studerd.api.security.credential.entity.request.SignupRequest;
import io.studerd.api.security.credential.service.CredentialService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("auth")
@RequiredArgsConstructor
@Tag(name = "Authentification", description = "Authentification API")
public class CredentialController {
    private final CredentialService service;

    private final JwtService jwtService;

    @GetMapping("/me")
    public ApiResponse get(final Principal principal) {
        Credential credential = service.findByUsername(principal.getName());
        if (credential != null) {
            return new ApiResponse(true, credential, ApiCodeResponse.ME_SUCCESS);
        }
        return new ApiResponse(false, credential, ApiCodeResponse.ME_SYSTEM_ERROR);
    }

    @DeleteMapping("/delete")
    public ApiResponse delete(final Principal principal) {
        Credential credential = service.findByUsername(principal.getName());
        if (credential == null) {
            return new ApiResponse(false, credential, ApiCodeResponse.ME_SYSTEM_ERROR);
        }
        return this.service.delete(principal);
    }

    @PostMapping("/signin")
    public ApiResponse signin(@RequestBody SigninRequest request) {
        return this.service.signin(request);
    }

    @PostMapping("/refresh")
    public ApiResponse refresh(@RequestBody RefreshRequest request) {
        return this.service.refreshToken(request);
    }

    @PostMapping("/signup")
    public ApiResponse signup(@RequestBody SignupRequest request) {
        return service.signup(request);
    }

    @PostMapping("/change-password")
    public ApiResponse changePassword(@RequestBody ChangePasswordRequest request, Principal principal) {
        return service.changePassword(principal, request);
    }
}
