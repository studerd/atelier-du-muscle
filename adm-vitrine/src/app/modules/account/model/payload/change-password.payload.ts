import {Payload} from '@shared/model';

export interface ChangePasswordPayload extends Payload {
  newOne: string;
  confirmation: string;
}
