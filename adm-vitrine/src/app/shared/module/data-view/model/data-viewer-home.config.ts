import {AppPageEnum, Business} from '@shared/model';
import {BehaviorSubject} from 'rxjs';

export interface DataViewerHomeConfig {
    translateKey: string;
    createPageEnum: AppPageEnum;
    list$: BehaviorSubject<any>
}