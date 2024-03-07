import {Business} from '@shared/model';
// @ts-ignore
import {Profile} from '@account/model';

export interface Credential extends Business {
  username: string;
  isActif: boolean;
  profile: Profile;
}


