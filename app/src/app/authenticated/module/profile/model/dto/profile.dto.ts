import {AddressDto} from '@address/model/dto';
import {Gender} from '@shared/model';

export interface ProfileDto {
    profile_id: string;
    firstname: string;
    lastname: string;
    phone: string;
    gender: Gender;
    address: AddressDto[];
    email:string;
    vatNumber: string;
}