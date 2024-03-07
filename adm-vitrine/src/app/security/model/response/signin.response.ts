import {CredentialDto} from '@security/model';
import {Dto} from '@shared/model';

export interface SigninResponse extends Dto {
    user: CredentialDto;
    token: string;
    refreshToken: string;
}
