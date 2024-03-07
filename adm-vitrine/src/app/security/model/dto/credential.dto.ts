import {Dto} from '@shared/model';
// @ts-ignore
import {ProfileDto} from '@account/model';

export interface CredentialDto extends Dto {
  actif: true,
  credential_id: string;
  username: string;
  profile:ProfileDto;
}
