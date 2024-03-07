package io.studerd.api.security.credential.service.impl;

import io.studerd.api.common.config.SignupCodeCreation;
import io.studerd.api.common.constant.ApiCodeResponse;
import io.studerd.api.common.entity.ApiResponse;
import io.studerd.api.common.service.EmailService;
import io.studerd.api.module.profile.entity.Profile;
import io.studerd.api.module.profile.entity.payload.ProfileCreatePayload;
import io.studerd.api.module.profile.service.ProfileService;
import io.studerd.api.security.config.JwtService;
import io.studerd.api.security.credential.entity.Credential;
import io.studerd.api.security.credential.entity.builder.CredentialBuilder;
import io.studerd.api.security.credential.entity.request.ChangePasswordRequest;
import io.studerd.api.security.credential.entity.request.RefreshRequest;
import io.studerd.api.security.credential.entity.request.SigninRequest;
import io.studerd.api.security.credential.entity.request.SignupRequest;
import io.studerd.api.security.credential.entity.response.SigninResponse;
import io.studerd.api.security.credential.entity.response.SignupResponse;
import io.studerd.api.security.credential.entity.response.TokenResponse;
import io.studerd.api.security.credential.repository.CredentialRepository;
import io.studerd.api.security.credential.service.CredentialService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class CredentialServiceImpl implements CredentialService {
    public final Logger logger = LoggerFactory.getLogger(CredentialServiceImpl.class);
    private final CredentialRepository repository;
    private final UserDetailsService userDetailsService;
    private final ProfileService profileService;
    private final PasswordEncoder encoder;
    private final EmailService mailService;
    private final JwtService jwtService;

    @Override
    public ApiResponse signin(SigninRequest request) {
        try {
            Credential credential = this.findByUsername(request.getUsername());
            SigninResponse response = new SigninResponse();
            if (credential != null && encoder.matches(request.getPassword(), credential.getPassword())) {
                response.setCredential(credential);
                response.setToken(jwtService.generateToken(credential));
                response.setRefreshToken(jwtService.generateRefreshToken(credential));
                return new ApiResponse(true, response, ApiCodeResponse.SIGNIN_SUCCESS);
            } else {
                return new ApiResponse(false, null, ApiCodeResponse.SIGNIN_NOT_FOUND);
            }
        } catch (Exception e) {
            logger.error(e.getMessage());
            return new ApiResponse(false, e.getMessage(), ApiCodeResponse.SIGNIN_SYSTEM_ERROR);
        }
    }


    @Override
    public Credential findByUsername(String username) {
        return repository.findByUsername(username).orElse(null);
    }

    @Override
    public ApiResponse changePassword(Principal principal, ChangePasswordRequest request) {

        Credential credential = this.findByUsername(principal.getName());
        if (credential != null) {
            credential.setPassword(encoder.encode(request.getNewOne()));
            this.repository.save(credential);
            return new ApiResponse(true, credential, ApiCodeResponse.CHANGE_SUCCESS);
        } else {
            return new ApiResponse(false, credential, ApiCodeResponse.ME_SYSTEM_ERROR);
        }
    }

    @Override
    public ApiResponse signup(SignupRequest request) {
        ApiResponse result = request.isValid();
        if (result.isResult()) {
            if (this.findByUsername(request.getUsername()) != null) {
                return new ApiResponse(false, null, ApiCodeResponse.SIGNUP_ERROR_ALREADY_EXIST);
            } else {
                try {
                    CredentialBuilder builder = new CredentialBuilder()
                            .setUsername(request.getUsername())
                            .setPassword(encoder.encode(request.getPassword()));
                    Credential credential = null;
                    if (request.getRole().size() == 0) {
                        Profile profile = profileService.findForCode(request.getCode());
                        if (profile != null) {
                            builder.setRoles(List.of(SignupCodeCreation.USER.role));
                            builder.setProfile(profile);
                            credential = this.repository.save(builder.build());
                            profileService.setCodeUsed(profile);

                        } else {
                            return new ApiResponse(true, null, ApiCodeResponse.SIGNUP_CODE_ERROR);
                        }
                    } else {
                        Profile p = this.profileService.create(new ProfileCreatePayload());
                        builder.setRoles(request.getRole());
                        builder.setProfile(p);
                        credential = this.repository.save(builder.build());
                    }
                    SignupResponse response = new SignupResponse();
                    response.setCredential(credential);
                    response.setToken(jwtService.generateToken(credential));
                    response.setRefreshToken(jwtService.generateRefreshToken(credential));
                    this.mailService.newClient(request);
                    return new ApiResponse(true, response, ApiCodeResponse.SIGNUP_SUCCESS);
                } catch (Exception e) {
                    e.printStackTrace();
                    return new ApiResponse(false, null, ApiCodeResponse.SIGNUP_ERROR);
                }
            }
        }
        return result;
    }

    @Override
    public ApiResponse delete(Principal principal) {
        Credential credential = this.findByUsername(principal.getName());
        if (credential != null) {
            this.repository.delete(credential);
        }
        return new ApiResponse(true, "", "api.credential-deleted");
    }

    @Override
    public boolean deleteFoProfileId(UUID uuid) {
        try {
            this.repository.deleteForProfileId(uuid);
            return true;
        } catch (Exception e) {
            log.error("[CredentialService - delete]:" + e.getMessage());
            return false;
        }
    }

    @Override
    public ApiResponse refreshToken(RefreshRequest request) {
        String userName = jwtService.extractUsername(request.getToken());
        if (userName != null) {
            Credential credential = this.findByUsername(userName);
            if (credential != null) {
                UserDetails userDetails = this.userDetailsService.loadUserByUsername(userName);
                if (jwtService.isTokenValid(request.getToken(), userDetails)) {
                    TokenResponse response = new TokenResponse();
                    response.setToken(jwtService.generateToken(credential));
                    response.setRefreshToken(jwtService.generateRefreshToken(credential));
                    return new ApiResponse(true, response, ApiCodeResponse.REFRESH_SUCCESS);
                } else {
                    return new ApiResponse(false, null, ApiCodeResponse.REFRESH_IS_EXPIRED);
                }
            } else {
                return new ApiResponse(false, null, ApiCodeResponse.REFRESH_USER_INVALID);
            }
        } else {
            return new ApiResponse(false, null, ApiCodeResponse.REFRESH_CANT_FOUND_USER_CLAIM);
        }
    }
}
