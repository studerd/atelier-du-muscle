import {Dto} from '@shared/model';

export interface CredentialDto extends Dto {
  actif: true,
  credential_id: string;
  username: string;
}
