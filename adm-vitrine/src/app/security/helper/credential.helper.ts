import {Credential, CredentialDto} from '@security/model';
// @ts-ignore
import {profileHelper} from '@account/helper';

export class CredentialHelper {
  public static credentialFromDto(dto: CredentialDto): Credential {
    return {
      id: dto.credential_id,
      username: dto.username,
      isActif: dto.actif,
      isEmpty: false,
      profile: profileHelper.fromDTO(dto.profile),
      str: ''
    }
  }

  public static getEmpty(): Credential {
    return {
      id: '',
      username: '',
      isActif: false,
      isEmpty: true,
      profile: profileHelper.getEmpty(),
      str: ''
    }
  }
}
