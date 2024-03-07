import {FormControl} from '@angular/forms';

export interface FormInputConfig<BUSINESS> {
  icon?: string;
  name: string;
  css?: string;
  type: string;
  translateKey: string;
  formControl: FormControl;
  data?:BUSINESS[];
  value?:BUSINESS
}
