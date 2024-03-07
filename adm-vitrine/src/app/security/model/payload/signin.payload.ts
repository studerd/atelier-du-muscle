import {Payload} from '@shared/model';
import {AbstractControl} from '@angular/forms';

export interface SigninPayload extends Payload {
  username: string;
  password: string;
}
export interface SigninPayloadFormGroup{
  username:AbstractControl,
  password:AbstractControl
}