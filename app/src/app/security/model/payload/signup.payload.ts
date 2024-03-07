import {Payload} from '@shared/model';
import {AbstractControl} from '@angular/forms';

export interface SignupPayload extends Payload {
  username: string;
  password: string;
  code:string;
}
export interface SignupPayloadFormGroup{
  username:AbstractControl,
  password:AbstractControl,
  code:AbstractControl
}
