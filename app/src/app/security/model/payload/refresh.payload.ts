import {Payload} from '@shared/model';

export interface RefreshPayload extends Payload {
  token: string;
}
