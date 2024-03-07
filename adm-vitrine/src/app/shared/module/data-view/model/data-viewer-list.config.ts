import {Business} from '@shared/model';
import {DataViewerActionConfig} from './data-viewer-action.config';
import {Observable} from 'rxjs';
import {FieldConfig} from './field.config';
import {DatalistFormConfig} from './data-list-form.config';
import {CrudService} from '@shared/service/crud.service';

export interface DataViewerListConfig {
    data: Observable<Business[]>;
    detailCallBack?: Function;
    actions: DataViewerActionConfig[];
    inlineAdd: boolean;
    needDetailHandler: boolean;
    fieldConfig: FieldConfig[],
    formConfig?: DatalistFormConfig
    save?: DataViewerSaveConfig
}

export interface DataViewerSaveConfig{
    save:Function;
    service:CrudService<any,any,any,any,any,any>
}