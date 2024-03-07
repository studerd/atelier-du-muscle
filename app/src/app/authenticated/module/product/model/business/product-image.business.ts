import {Business} from '@shared/model';

export interface ProductImage extends Business {
    path: string;
    content: string;
    position: number;
}