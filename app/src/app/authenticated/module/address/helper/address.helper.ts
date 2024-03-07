import {Helper} from '@shared/contract';
import {Address, AddressDto, AddressFormConfig} from '../model';
import {AddressCreatePayload, AddressUpdatePayload} from '@address/model/payload';
import {FormControl, FormGroup} from '@angular/forms';
import {Profile} from '@profile/model';
import {Business} from '@shared/model';
import {isNil} from 'lodash';

export class AddressHelper implements Helper<Address, AddressDto, AddressFormConfig> {
    fromDTO(dto: AddressDto): Address {
        if (isNil(dto)) {
            return addressHelper.getEmpty();
        }
        return {
            complement: dto.complement,
            country: dto.country,
            cp: dto.cp,
            id: dto.address_id,
            road: dto.road,
            town: dto.town,
            isEmpty: false,
            str: `${dto.road} ${dto.nb} ${dto.complement} ${dto.cp} ${dto.town}`,
            nb: dto.nb,
            title: dto.title
        }
    }

    getEmpty(): Address {
        return {
            complement: '',
            country: '',
            cp: '',
            id: '',
            road: '',
            town: '',
            isEmpty: true,
            str: 'common.no-address',
            nb: '0',
            title: ''
        }
    }

    toDTO(business: Address): AddressDto {

        return {
            complement: business.complement,
            country: business.country,
            cp: business.cp,
            address_id: business.id,
            road: business.road,
            town: business.town,
            nb: business.nb,
            title: business.title
        }
    }

    toDetailConfig(business: Address): AddressFormConfig {
        const formGroup = new FormGroup({
            title: new FormControl(business.title),
            cp: new FormControl(business.cp),
            road: new FormControl(business.road),
            town: new FormControl(business.town),
            country: new FormControl(business.country),
            complement: new FormControl(business.complement),
            nb: new FormControl(business.nb)
        });
        const translateKey = 'page.account-home.part.address.';
        return {
            formGroup: formGroup,
            title: {
                name: 'title',
                type: 'text',
                translateKey: translateKey,
                formControl: (formGroup.get('title')!) as unknown as FormControl
            },
            cp: {
                name: 'cp',
                type: 'text',
                translateKey: translateKey,
                formControl: (formGroup.get('cp')!) as unknown as FormControl
            },
            road: {
                name: 'road',
                type: 'text',
                translateKey: translateKey,
                formControl: (formGroup.get('road')!) as unknown as FormControl
            },
            town: {
                name: 'town',
                type: 'text',
                translateKey: translateKey,
                formControl: (formGroup.get('town')!) as unknown as FormControl
            },
            country: {
                name: 'country',
                type: 'select',
                data: townChoose,
                translateKey: translateKey,
                formControl: (formGroup.get('country')!) as unknown as FormControl
            },
            complement: {
                name: 'complement',
                type: 'text',
                translateKey: translateKey,
                formControl: (formGroup.get('complement')!) as unknown as FormControl
            },
            nb: {
                name: 'nb',
                type: 'text',
                translateKey: translateKey,
                formControl: (formGroup.get('nb')!) as unknown as FormControl
            },
            address: addressHelper.toPartialUpdatePayload(business),
            business: business
        }
    }

    toPartialUpdatePayload(business: Address): Partial<AddressUpdatePayload> {
        if (business.isEmpty) {
            return {
                cp: business.cp,
                road: business.road,
                town: business.town,
                country: business.country,
                complement: business.complement,
                nb: business.nb,
            }
        }
        return {
            address_id: business.id,
            cp: business.cp,
            road: business.road,
            town: business.town,
            country: business.country,
            complement: business.complement,
            nb: business.nb,
        }
    }

    formConfigToCreatePayload(detailFormConfig: AddressFormConfig): AddressCreatePayload {
        return {
            title: detailFormConfig.title.formControl.value,
            cp: detailFormConfig.cp.formControl.value,
            road: detailFormConfig.road.formControl.value,
            town: detailFormConfig.town.formControl.value,
            country: detailFormConfig.country.formControl.value,
            complement: detailFormConfig.complement.formControl.value,
            nb: detailFormConfig.nb.formControl.value,
        }
    }

    formConfigToUpdatePayload(business: Address, detailFormConfig: AddressFormConfig): Partial<AddressUpdatePayload> {
        if (business.isEmpty) {
            return {
                title: detailFormConfig.title.formControl.value,
                cp: detailFormConfig.cp.formControl.value,
                road: detailFormConfig.road.formControl.value,
                town: detailFormConfig.town.formControl.value,
                country: detailFormConfig.country.formControl.value,
                complement: detailFormConfig.complement.formControl.value,
                nb: detailFormConfig.nb.formControl.value,
            }
        }
        return {
            title: detailFormConfig.title.formControl.value,
            address_id: business.id,
            cp: detailFormConfig.cp.formControl.value,
            road: detailFormConfig.road.formControl.value,
            town: detailFormConfig.town.formControl.value,
            country: detailFormConfig.country.formControl.value,
            complement: detailFormConfig.complement.formControl.value,
            nb: detailFormConfig.nb.formControl.value,
        }
    }

}

const townChoose: Business[] = [
    {id: 'Allemagne', str: 'Allemagne', isEmpty: false},
    {id: 'Belgique', str: 'Belgique', isEmpty: false},
    {id: 'France', str: 'France', isEmpty: false},
    {id: 'Luxembourg', str: 'Luxembourg', isEmpty: false},
    {id: 'Pays-bas', str: 'Pays-bas', isEmpty: false}];

export const addressHelper = new AddressHelper();