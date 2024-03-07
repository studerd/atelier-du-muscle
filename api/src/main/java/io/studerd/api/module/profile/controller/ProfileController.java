package io.studerd.api.module.profile.controller;

import io.studerd.api.common.constant.ApiCodeResponse;
import io.studerd.api.common.contract.CrudController;
import io.studerd.api.common.entity.ApiResponse;
import io.studerd.api.module.profile.entity.Profile;
import io.studerd.api.module.profile.entity.payload.ProfileCreatePayload;
import io.studerd.api.module.profile.entity.payload.ProfileUpdatePayload;
import io.studerd.api.module.profile.service.ProfileService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("profile")
@RequiredArgsConstructor
@Tag(name = "Profile", description = "Profile API")
public class ProfileController implements CrudController<UUID, ProfileCreatePayload, ProfileUpdatePayload> {
    public final ProfileService service;

    @Override
    @GetMapping("list")
    public ApiResponse list() {
        return new ApiResponse(true, service.list(), ApiCodeResponse.PROFILE_LIST_SUCCESS);
    }

    @Override
    @GetMapping("detail/{id}")
    public ApiResponse detail(@PathVariable("id") UUID uuid) {
        Profile detail = service.detail(uuid);
        if (detail == null) {
            return new ApiResponse(false, null, ApiCodeResponse.PROFILE_NOT_FOUND);
        }
        return new ApiResponse(true, detail, ApiCodeResponse.PROFILE_FOUND);
    }

    @Override
    @PostMapping("create")
    public ApiResponse create(@RequestBody ProfileCreatePayload payload) {
        Profile created = service.create(payload);
        if (created == null) {
            return new ApiResponse(false, null, ApiCodeResponse.PROFILE_CREATE_ERROR);
        }
        return new ApiResponse(true, created, ApiCodeResponse.PROFILE_CREATE_SUCCESS);
    }

    @Override
    @PutMapping("update")
    public ApiResponse update(@RequestBody ProfileUpdatePayload payload) {
        Profile updated = service.update(payload);
        if (updated == null) {
            return new ApiResponse(false, null, ApiCodeResponse.PROFILE_UPDATE_ERROR);
        }
        return new ApiResponse(true, updated, ApiCodeResponse.PROFILE_UPDATE_SUCCESS);
    }

    @Override
    @DeleteMapping("delete/{id}")
    public ApiResponse delete(@PathVariable("id") UUID uuid) {
        if (!service.delete(uuid)) {
            return new ApiResponse(false, null, ApiCodeResponse.PROFILE_DELETE_ERROR);
        }
        return new ApiResponse(true, null, ApiCodeResponse.PROFILE_DELETE_SUCCESS);
    }
}
