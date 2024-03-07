import {LabelWithParam} from '@shared/model/label-with-param.interface';
import {AppPageEnum} from '@shared/model';

export interface CardHeaderConfig {
  title: LabelWithParam;
  icon?: string;
  titleLink?: AppPageEnum;
  actions?: [];
}
