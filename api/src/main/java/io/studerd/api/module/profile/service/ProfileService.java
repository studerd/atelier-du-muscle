package io.studerd.api.module.profile.service;

import io.studerd.api.common.config.Role;
import io.studerd.api.common.contract.CrudService;
import io.studerd.api.module.profile.entity.Profile;
import io.studerd.api.module.profile.entity.payload.ProfileCreatePayload;
import io.studerd.api.module.profile.entity.payload.ProfileUpdatePayload;

import java.util.List;
import java.util.UUID;

public interface ProfileService extends CrudService<Profile, UUID, ProfileCreatePayload, ProfileUpdatePayload> {
    Profile findForCode(String code);
    void setCodeUsed(Profile profile);
}
