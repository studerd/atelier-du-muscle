package io.studerd.api.module.profile.service.impl;

import io.studerd.api.module.profile.entity.Profile;
import io.studerd.api.module.profile.entity.payload.ProfileCreatePayload;
import io.studerd.api.module.profile.entity.payload.ProfileUpdatePayload;
import io.studerd.api.module.profile.repository.ProfileRepository;
import io.studerd.api.module.profile.service.ProfileService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ProfileServiceImpl implements ProfileService {
    public final ProfileRepository repository;


    @Override
    public List<Profile> list() {
        try {
            return this.repository.findAllActive();
        } catch (Exception e) {
            log.error("[ProfileService - list] " + e.getMessage());
            return new ArrayList<>();
        }
    }

    @Override
    public Profile detail(UUID uuid) {
        try {
            return this.repository.findByIdActive(uuid).orElse(null);
        } catch (Exception e) {
            log.error("[ProfileService - detail] " + e.getMessage());
            return null;
        }
    }

    @Override
    public Profile create(ProfileCreatePayload payload) {
        try {
            Profile newProfile = Profile.builder()
                    .firstname(payload.getFirstname())
                    .lastname(payload.getLastname())
                    .phone(payload.getPhone())
                    .email(payload.getEmail())
                    .gender(payload.getGender())
                    .address(payload.getAddress())
                    .vatNumber(payload.getVatNumber())
                    .creatorCode(RandomStringUtils.random(10, true, true))
                    .creatorCodeIsUsed(false).build();
            return this.repository.save(newProfile);
        } catch (Exception e) {
            log.error("[ProfileService - create] " + e.getMessage());
            return null;
        }
    }

    @Override
    public Profile update(ProfileUpdatePayload payload) {
        try {
            Profile detail = this.detail(payload.getProfile_id());
            if (detail != null) {
                detail.setAddress(payload.getAddress());
                detail.setFirstname(payload.getFirstname());
                detail.setLastname(payload.getLastname());
                detail.setGender(payload.getGender());
                detail.setPhone(payload.getPhone());
                detail.setEmail(payload.getEmail());
                detail.setVatNumber(payload.getVatNumber());
                return this.repository.save(detail);
            }
            return null;
        } catch (Exception e) {
            e.printStackTrace();
            log.error("[ProfileService - update] " + e.getMessage());
            return null;
        }
    }

    @Override
    public boolean delete(UUID uuid) {
        try {
            Profile detail = this.detail(uuid);
            if (detail != null) {
                detail.setDeleted(true);
                this.repository.save(detail);
                return true;
            }
            return false;
        } catch (Exception e) {
            log.error("[ProfileService - update] " + e.getMessage());
            return false;
        }
    }

    @Override
    public Profile findForCode(String code) {
        try {
            return repository.findForCode(code).orElse(null);
        } catch (Exception e) {
            log.error("[ProfileService - findForCode] " + e.getMessage());
            return null;
        }
    }

    @Override
    public void setCodeUsed(Profile profile) {
        try {
            profile.setCreatorCodeIsUsed(true);
            repository.save(profile);
        } catch (Exception e) {
            log.error("[ProfileService - setCodeUsed] " + e.getMessage());
        }

    }
}
