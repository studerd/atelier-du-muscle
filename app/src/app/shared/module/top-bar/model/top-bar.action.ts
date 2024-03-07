import {LabelWithParam} from '@shared/model/label-with-param.interface';

export interface TopBarAction {
    icon?: string;
    label: LabelWithParam;
    callback: Function;
    css?: string;
}

export const topBarActionDefaultPrimary = {
    icon: 'fa-check', label: {label: 'common.ok'}, callback: () => {
        alert('default btn callback');
    }, css: 'primary'
};
export const topBarActionDefaultSecondary = {
    icon: 'fa-user', label: {label: 'common.cancel'}, callback: () => {
        alert('default btn callback');
    }, css: 'secondary'
};