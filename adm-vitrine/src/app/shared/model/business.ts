import {IsEmpty} from './is-empty';

export interface Business extends IsEmpty {
    id: string;
    str: string;
}

export const defaultBusiness: Business = {id: '', isEmpty: true, str: ''}