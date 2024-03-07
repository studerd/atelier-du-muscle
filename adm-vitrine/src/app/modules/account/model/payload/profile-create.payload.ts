import {Gender} from '@shared/model';
import {AddressUpdatePayload} from '@account/model';

export interface ProfileCreatePayload {
  firstname: string;
  lastname: string;
  phone: string;
  gender: Gender;
  address: Partial<AddressUpdatePayload>[];
  email: string;
  vatNumber: string;

}
