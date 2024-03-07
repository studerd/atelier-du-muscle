import {Gender} from '@shared/model';
import {AddressUpdatePayload} from '@account/model';

export interface ProfileUpdatePayload {
  profile_id: string;
  firstname: string;
  lastname: string;
  phone: string;
  gender: Gender;
  address: Partial<AddressUpdatePayload> [];
  email: string;
  vatNumber: string;
}
