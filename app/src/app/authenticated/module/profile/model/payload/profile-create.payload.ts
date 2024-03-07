import {Gender} from '@shared/model';
import {AddressCreatePayload, AddressUpdatePayload} from '@address/model/payload';

export interface ProfileCreatePayload {
    firstname: string;
    lastname: string;
    phone: string;
    gender: Gender;
    address: Partial<AddressUpdatePayload>[];
    email: string;
    vatNumber: string;

}