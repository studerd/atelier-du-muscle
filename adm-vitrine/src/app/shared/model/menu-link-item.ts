import {LabelWithParam} from '@shared/model/label-with-param.interface';
import {AppPageEnum} from '@shared/model/enum';

export interface MenuLinkItem {
    icon?: string;
    title: LabelWithParam,
    link: AppPageEnum
}
