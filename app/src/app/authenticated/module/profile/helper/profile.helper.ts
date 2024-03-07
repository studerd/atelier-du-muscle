import {Helper} from '@shared/contract';
import {Profile, ProfileCreatePayload, ProfileDetailFormConfig, ProfileDto, ProfileUpdatePayload} from '@profile/model';
import {Business, Gender} from '@shared/model';
import {addressHelper} from '@address/helper';
import {FormControl, FormGroup} from '@angular/forms';
import {Address, AddressDto, AddressFormConfig} from '@address/model';
import {isNil} from 'lodash';

class ProfileHelper implements Helper<Profile, ProfileDto, ProfileDetailFormConfig> {
    toString(firstname: string, lastname: string): string {
        let str: string = lastname;
        if (isNil(str) || str.length == 0) {
            if (isNil(firstname) || firstname.length == 0) {
                str = 'Non défini'
            }
        } else {
            if (!(isNil(firstname) || firstname.length == 0)) {
                str += ' ' + firstname
            }
        }
        return str;
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
            str: this.toString(dto.lastname,dto.firstname),
            email: dto.email,
            vatNumber: dto.vatNumber
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
            vatNumber: ''
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
                type: 'text',
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

    tvaIsValid(vatNumber: string): boolean {
        const regex = new RegExp('^[A-Za-z]{2,4}(?=.{2,12}$)[-_ 0-9]*(?:[a-zA-Z][-_ 0-9]*){0,2}$');
        return regex.test(vatNumber);
    }
}

const genderChoose: Business[] = [
    {id: 'OTHER', str: 'Autre', isEmpty: false},
    {id: 'MALE', str: 'Homme', isEmpty: false},
    {id: 'FEMALE', str: 'Femme', isEmpty: false}]
export const profileHelper = new ProfileHelper();