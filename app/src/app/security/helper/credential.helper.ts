import {Credential, CredentialDto} from '@security/model';

export class CredentialHelper {
    public static credentialFromDto(dto: CredentialDto): Credential {
        return {
            id: dto.credential_id,
            username: dto.username,
            isActif: dto.actif,
            isEmpty: false,
            str: ''
        }
    }

    public static getEmpty(): Credential {
        return{
            id:'',
            username:'',
            isActif:false,
            isEmpty:true,
            str: ''
        }
    }
}
