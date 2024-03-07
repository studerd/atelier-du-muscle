import {LabelWithParam} from '@shared/model/label-with-param.interface';
import {TopBarAction, topBarActionDefaultPrimary, topBarActionDefaultSecondary} from './top-bar.action';
import {TopBarSearchConfig, topBarSearchDefaultConfig} from './top-bar-search.config';
import {NavigationService} from '@shared/service';

export interface TopBarConfig {
    titleIcon?: string;
    search?: TopBarSearchConfig;
    service?: any;
    title: LabelWithParam;
    actions: TopBarAction[];
    navigationService?: NavigationService
}

export const topBarDefaultConfig: TopBarConfig = {
    titleIcon: 'fa-home',
    search: topBarSearchDefaultConfig,
    title: {label: 'common.default-title'},
    actions: [topBarActionDefaultPrimary, topBarActionDefaultSecondary]
}