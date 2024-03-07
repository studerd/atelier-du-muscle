import {Gender} from '@shared/model';
import {ProfileDto} from '@profile/model';
import {AddressCreatePayload, AddressUpdatePayload} from '@address/model/payload';

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
