import {Gender} from '@shared/model';
import {AddressDto} from '@account/model';

export interface ProfileDto {
  profile_id: string;
  firstname: string;
  lastname: string;
  phone: string;
  gender: Gender;
  address: AddressDto[];
  email: string;
  vatNumber: string;
}
