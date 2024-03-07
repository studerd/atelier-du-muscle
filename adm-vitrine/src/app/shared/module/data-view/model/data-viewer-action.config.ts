import {LabelWithParam} from '@shared/model/label-with-param.interface';
import {NavigationService} from '@shared/service';

export interface DataViewerActionConfig {
    icon?: string;
    label: LabelWithParam;
    callback: Function;
    css?: string;
    navigationService: NavigationService,
    dataService: any;
    data?: any;
}