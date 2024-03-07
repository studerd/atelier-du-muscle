import {FieldType} from '@shared/module/data-view/model/enum';

export interface FieldConfig {
    name: string;
    type: FieldType;
    translateKey: string;
}