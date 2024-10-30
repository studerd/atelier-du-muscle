import {Helper} from '@shared/contract';
import {
  Address,
  AddressCreatePayload,
  AddressDto,
  AddressFormConfig,
  AddressUpdatePayload,
  AddressValidationEnum,
  AddressValidationPayload
} from '@account/model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
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
      str: `${dto.road} ${dto.nb}, ${dto.cp} ${dto.town} - ${dto.country}`,
      nb: dto.nb,
      title: dto.title,
      longitude: dto.longitude,
      latitude: dto.latitude
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
      title: 'Domicile',
      longitude: '0',
      latitude: '0'
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
      title: business.title,
      longitude: business.longitude,
      latitude: business.latitude
    }
  }
fromManual(address:string):AddressFormConfig {
    const addressFormatted: Address = {
      complement: '',
      country: '',
      cp: '',
      id: '',
      isEmpty: false,
      latitude: '',
      longitude: '',
      nb: '',
      road: address,
      str: '',
      title: '',
      town: ''
    }
    return this.toDetailConfig(addressFormatted);
}
  toDetailConfig(business: Address): AddressFormConfig {
    const formGroup = new FormGroup({
      title: new FormControl(business.title, [Validators.required]),
      cp: new FormControl(business.cp, [Validators.required]),
      road: new FormControl(business.road, [Validators.required]),
      town: new FormControl(business.town, [Validators.required]),
      country: new FormControl(business.country, [Validators.required]),
      complement: new FormControl(business.complement),
      nb: new FormControl(business.nb, [Validators.required])
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
      business: business,
      isValid: !business.isEmpty,
      feedback: (business.isEmpty) ? '' : '',
      longitude: business.longitude,
      latitude: business.latitude
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
      longitude: detailFormConfig.longitude,
      latitude: detailFormConfig.latitude
    }
  }

  countryToRegionCode(country: string): AddressValidationEnum {
    switch (country) {
      case 'Allemagne':
        return AddressValidationEnum.DE;
      case 'Belgique':
        return AddressValidationEnum.BE;
      case 'France':
        return AddressValidationEnum.FR;
      case 'Luxembourg':
        return AddressValidationEnum.LU;
      case 'Pays-bas':
        return AddressValidationEnum.NL;
      default:
        return AddressValidationEnum.BE;
    }
  }

  formConfigToAddressValidation(data: AddressFormConfig[]): AddressValidationPayload[] {
    return data.map((a: AddressFormConfig) => {
      return {
        address: {
          regionCode: this.countryToRegionCode(a.country.formControl.value),
          locality: a.town.formControl.value,
          postalCode: a.cp.formControl.value,
          addressLines: [a.nb.formControl.value + ' ' + a.road.formControl.value]
        }
      }
    });
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
        latitude: detailFormConfig.latitude,
        longitude: detailFormConfig.longitude,
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
      latitude: detailFormConfig.latitude,
      longitude: detailFormConfig.longitude,
    }
  }

}

const townChoose: Business[] = [
  {id: 'Allemagne', str: 'Allemagne', isEmpty: false},
  {id: 'Belgique', str: 'Belgique', isEmpty: false},
  {id: 'France', str: 'France', isEmpty: false},
  {id: 'Luxembourg', str: 'Luxembourg', isEmpty: false},
  {id: 'Pays-bas', str: 'Pays-bas', isEmpty: false}]
export const addressHelper = new AddressHelper();
