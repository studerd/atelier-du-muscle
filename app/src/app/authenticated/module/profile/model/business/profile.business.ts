import {Business, Gender} from '@shared/model';
import {Address} from '@address/model';

export interface Profile extends Business {
    firstname: string;
    lastname: string;
    phone: string;
    gender: Gender;
    address: Address[];
    email:string;
    vatNumber: string;
}