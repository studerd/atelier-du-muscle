import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Toast, ToastType} from '../model/';
import {ApiResponse} from '@shared/model';

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    toaster$: Subject<Toast> = new Subject<Toast>();

    constructor() {
    }

    show(type: ToastType, body: string, title?: string, delay?: number) {
        this.toaster$.next({type, title, body, delay});
    }

    showFromApiResponse(data: ApiResponse):void {
        if(data.result){
            this.show(ToastType.SUCCESS, data.code);
        }else{
            this.show(ToastType.ERROR, data.code);
        }
    }
}