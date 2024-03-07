import {Injectable} from '@angular/core';
import {CrudService} from '@shared/service/crud.service';
import {Profile, ProfileCreatePayload, ProfileDetailFormConfig, ProfileDto, ProfileUpdatePayload} from '@profile/model';
import {profileHelper} from '@profile/helper/profile.helper';

@Injectable({
    providedIn: 'root'
})
export class ProfileService extends CrudService<Profile, ProfileDto, string, ProfileCreatePayload, ProfileUpdatePayload, ProfileDetailFormConfig> {
    override helper = profileHelper;
    override entityName = 'PROFILE';
}