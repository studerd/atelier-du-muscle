import {SearchHandler} from './search-handler.enum';

export interface TopBarSearchConfig {
    search: boolean;
    callback: Function;
    data: any;
    placeholder: string;
    handler: SearchHandler;
}

export const topBarSearchDefaultConfig: TopBarSearchConfig = {
    search: true,
    callback: () => alert('my data'),
    data: '',
    placeholder: 'common.placeholder',
    handler: SearchHandler.ON_CHANGE
}