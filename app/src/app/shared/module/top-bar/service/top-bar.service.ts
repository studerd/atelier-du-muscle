import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {TopBarConfig, topBarDefaultConfig} from '../model';

@Injectable({
    providedIn: 'root'
})
export class TopBarService {
    config$: BehaviorSubject<TopBarConfig | null> = new BehaviorSubject<TopBarConfig | null>(null);

    constructor() {
    }

    setConfig(config: TopBarConfig): void {
        this.config$.next(config);
    }
}
