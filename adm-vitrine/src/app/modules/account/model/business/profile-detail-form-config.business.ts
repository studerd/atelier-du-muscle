import {Business, DetailForm} from '@shared/model';
import {FormInputConfig} from '@shared/module/form/model';
import {AddressFormConfig} from '@account/model';

export interface ProfileDetailFormConfig extends DetailForm {
  firstname: FormInputConfig<Business>
  lastname: FormInputConfig<Business>
  phone: FormInputConfig<Business>
  gender: FormInputConfig<Business>
  email: FormInputConfig<Business>;
  vatNumber: FormInputConfig<Business>;
  address: AddressFormConfig[];
}
