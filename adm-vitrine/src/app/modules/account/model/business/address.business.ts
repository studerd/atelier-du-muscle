import {Business} from '@shared/model';

export interface Address extends Business {
  title: string;
  cp: string;
  road: string;
  town: string;
  country: string;
  complement: string;
  nb: string;
  latitude: string;
  longitude: string;

}
