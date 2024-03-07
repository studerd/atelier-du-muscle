import {ToastType} from '@shared/module/toast/model/toast-type';

export interface Toast {
    type: ToastType;
    title?: string;
    body: string;
    delay?: number;
}