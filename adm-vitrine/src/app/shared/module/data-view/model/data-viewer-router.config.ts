import {NavigationService} from '@shared/service';
import {CrudService} from '@shared/service/crud.service';
import {Business, Dto} from '@shared/model';

export interface DataViewerRouterConfig {
    dataService: CrudService<any, any, string, any, any,any>;
    navigation: NavigationService,
    translateKey:string;
}