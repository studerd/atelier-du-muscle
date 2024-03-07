import {FormInputConfig} from '@shared/module/form/model';
import {Business, DetailForm} from '@shared/model';
import {Address, AddressUpdatePayload} from '@account/model';

export interface AddressFormConfig extends DetailForm {
  title: FormInputConfig<Business>;
  cp: FormInputConfig<Business>;
  road: FormInputConfig<Business>;
  town: FormInputConfig<Business>;
  country: FormInputConfig<Business>;
  complement: FormInputConfig<Business>;
  nb: FormInputConfig<Business>;
  address: Partial<AddressUpdatePayload>;
  business: Address;
  isValid: boolean;
  feedback:string;
  latitude: string;
  longitude: string;
}
