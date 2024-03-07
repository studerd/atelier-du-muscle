import {Business, DetailForm} from '@shared/model';
import {FormInputConfig} from '@shared/module/form/model';

export interface ChangePasswordFormConfig extends DetailForm {
  newOne: FormInputConfig<Business>;
  confirmation: FormInputConfig<Business>;

}
