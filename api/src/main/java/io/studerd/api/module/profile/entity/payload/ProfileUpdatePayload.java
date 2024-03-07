package io.studerd.api.module.profile.entity.payload;

import io.studerd.api.common.entity.enums.Gender;
import io.studerd.api.module.address.entity.Address;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProfileUpdatePayload {
    private UUID profile_id;
    private String firstname;
    private String lastname;
    private String phone;
    private Gender gender;
    private String email;
    List<Address> address;
    private String vatNumber;
}
