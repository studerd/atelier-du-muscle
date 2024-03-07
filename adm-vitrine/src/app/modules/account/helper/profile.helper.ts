import {Helper} from '@shared/contract';
import {
  Address,
  AddressDto,
  AddressFormConfig,
  ChangePasswordFormConfig,
  Profile,
  ProfileCreatePayload,
  ProfileDetailFormConfig,
  ProfileDto,
  ProfileUpdatePayload
} from '@account/model';
import {Business, Gender} from '@shared/model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {addressHelper} from '@account/helper/address.helper';
import {isNil} from 'lodash';

class ProfileHelper implements Helper<Profile, ProfileDto, ProfileDetailFormConfig> {
  public static checkValidity(profile: ProfileDto |Profile):boolean{
    return (!isNil(profile.firstname) && profile.firstname.trim().length > 0 &&
      !isNil(profile.lastname) && profile.lastname.trim().length > 0 &&
      !isNil(profile.email) && profile.email.trim().length > 0 &&
      !isNil(profile.phone) && profile.phone.trim().length > 0 &&
      !isNil(profile.address) && profile.address.length > 0)
  }
  fromDTO(dto: ProfileDto): Profile {
    if (isNil(dto)) {
      return this.getEmpty();
    }
    return {
      id: dto.profile_id,
      firstname: dto.firstname,
      lastname: dto.lastname,
      phone: dto.phone,
      gender: dto.gender,
      address: (isNil(dto.address)) ? [] : dto.address.map((a: AddressDto) => addressHelper.fromDTO(a)),
      isEmpty: false,
      str: `${dto.lastname} ${dto.firstname}`,
      email: dto.email,
      vatNumber: dto.vatNumber,
      isValid: ProfileHelper.checkValidity(dto)
    }
  }

  getEmpty(): Profile {
    return {
      id: '',
      firstname: '',
      lastname: '',
      phone: '',
      gender: Gender.OTHER,
      address: [addressHelper.getEmpty()],
      isEmpty: true,
      str: 'common.no-profile',
      email: '',
      vatNumber: '',
      isValid:false
    }
  }

  toDTO(business: Profile): ProfileDto {
    return {
      profile_id: business.id,
      firstname: business.firstname,
      lastname: business.lastname,
      phone: business.phone,
      gender: business.gender,
      address: business.address.map((a: Address) => addressHelper.toDTO(a)),
      email: business.email,
      vatNumber: business.vatNumber
    }
  }

  toDetailConfig(business: Profile): ProfileDetailFormConfig {
    const addressFormConfig: AddressFormConfig[] = business.address.map((a: Address) => addressHelper.toDetailConfig(a));
    const formGroup = new FormGroup({
      firstname: new FormControl(business.firstname),
      gender: new FormControl(business.gender),
      lastname: new FormControl(business.lastname),
      phone: new FormControl(business.phone),
      email: new FormControl(business.email),
      vatNumber: new FormControl(business.vatNumber)
    });
    const translateKey = 'page.profile-detail.';
    return {
      formGroup: formGroup,
      firstname: {
        name: 'firstname',
        type: 'text',
        translateKey: translateKey,
        formControl: (formGroup.get('firstname')!) as unknown as FormControl
      },
      gender: {
        name: 'gender',
        type: 'select',
        data: genderChoose,
        translateKey: translateKey,
        formControl: (formGroup.get('gender')!) as unknown as FormControl
      },
      lastname: {
        name: 'lastname',
        type: 'text',
        translateKey: translateKey,
        formControl: (formGroup.get('lastname')!) as unknown as FormControl
      },
      phone: {
        name: 'phone',
        type: 'phone',
        translateKey: translateKey,
        formControl: (formGroup.get('phone')!) as unknown as FormControl
      },
      email: {
        name: 'email',
        type: 'text',
        translateKey: translateKey,
        formControl: (formGroup.get('email')!) as unknown as FormControl
      },
      vatNumber: {
        name: 'vatNumber',
        type: 'text',
        translateKey: translateKey,
        formControl: (formGroup.get('vatNumber')!) as unknown as FormControl
      },
      address: addressFormConfig


    };
  }

  formConfigToCreatePayload(detailFormConfig: ProfileDetailFormConfig): ProfileCreatePayload {
    return {
      firstname: detailFormConfig.firstname.formControl.value,
      lastname: detailFormConfig.lastname.formControl.value,
      phone: detailFormConfig.phone.formControl.value,
      gender: detailFormConfig.gender.formControl.value,
      address: detailFormConfig.address.map((a: AddressFormConfig) => a.address),
      email: detailFormConfig.email.formControl.value,
      vatNumber: detailFormConfig.vatNumber.formControl.value
    }
  }

  formConfigToUpdatePayload(business: Profile, detailFormConfig: ProfileDetailFormConfig): ProfileUpdatePayload {
    return {
      profile_id: business.id,
      firstname: detailFormConfig.firstname.formControl.value,
      lastname: detailFormConfig.lastname.formControl.value,
      phone: detailFormConfig.phone.formControl.value,
      gender: detailFormConfig.gender.formControl.value,
      address: detailFormConfig.address.map((a: AddressFormConfig) => addressHelper.formConfigToUpdatePayload(a.business, a)),
      email: detailFormConfig.email.formControl.value,
      vatNumber: detailFormConfig.vatNumber.formControl.value
    }
  }

  changePasswordFormConfig(): ChangePasswordFormConfig {
    const formGroup = new FormGroup({
      newOne: new FormControl('', [Validators.required]),
      confirmation: new FormControl('', [Validators.required])
    });
    const translateKey = 'page.profile-detail.';
    return {
      formGroup: formGroup,
      newOne: {
        name: 'newOne',
        type: 'password',
        translateKey: translateKey,
        formControl: (formGroup.get('newOne')!) as unknown as FormControl
      },
      confirmation: {
        name: 'confirmation',
        type: 'password',
        translateKey: translateKey,
        formControl: (formGroup.get('confirmation')!) as unknown as FormControl
      }
    }
  }
}

const genderChoose: Business[] = [
  {id: 'OTHER', str: 'Autre', isEmpty: false},
  {id: 'MALE', str: 'Homme', isEmpty: false},
  {id: 'FEMALE', str: 'Femme', isEmpty: false}]
export const profileHelper = new ProfileHelper();
