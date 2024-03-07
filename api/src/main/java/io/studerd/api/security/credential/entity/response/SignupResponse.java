package io.studerd.api.security.credential.entity.response;

import io.studerd.api.security.credential.entity.Credential;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignupResponse {
    Credential credential;
    String token;
    String refreshToken;

}