import {Business} from '@shared/model';

export interface Credential extends Business {
    username: string;
    isActif: boolean;
}


