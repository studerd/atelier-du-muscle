package io.studerd.api.security.credential.repository;

import io.studerd.api.security.credential.entity.Credential;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.UUID;

public interface CredentialRepository extends JpaRepository<Credential, UUID> {
    Optional<Credential> findByUsername(String username);
    @Query("DELETE  FROM Credential c WHERE c.profile.profile_id=:uuid")
    void deleteForProfileId(UUID uuid);
}
