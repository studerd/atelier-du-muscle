import {CredentialDto} from '@security/model';

export interface SignupResponse {
    user: CredentialDto;
    token: string;
    refreshToken: string;
}