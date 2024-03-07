import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchHandler, TopBarConfig, topBarDefaultConfig} from '../../model';
import {TopBarService} from '@shared/module/top-bar/service';
import {debounceTime, Subject} from 'rxjs';
import {takeUntil, tap} from 'rxjs/operators';
import {TooltipPosition} from '@shared/module/tooltip/model';

@Component({
    selector: 'app-module-top-bar',
    templateUrl: './module-top-bar.component.html',
    styleUrls: ['./module-top-bar.component.scss']
})
export class ModuleTopBarComponent implements OnInit, OnDestroy {
    config: TopBarConfig | null = topBarDefaultConfig;
    destroyers$ = new Subject<void>();
    tooltipPosition = TooltipPosition;
    debounceTime = 500;
    private modelChanged: Subject<void> = new Subject<void>();

    constructor(public topBarService: TopBarService) {
    }

    ngOnInit(): void {
        this.topBarService.config$.pipe(
            takeUntil(this.destroyers$),
            tap((config: TopBarConfig | null) => this.config = config)
        ).subscribe();
        this.modelChanged.pipe(
            takeUntil(this.destroyers$),
            debounceTime(this.debounceTime),
        ).subscribe(() => {
            this.config?.search?.callback(this.config.search?.data);
        });
    }

    ngOnDestroy(): void {
        this.destroyers$.next();
        this.destroyers$.complete();
    }

    onSearch(): void {
        if (this.config?.search?.handler === SearchHandler.ON_CHANGE) {
            this.modelChanged.next();
        }
    }

    onSearchClick(): void {
        if (this.config?.search?.handler === SearchHandler.ON_CLICK) {
            this.config.search?.callback(this.config.search?.data);
        }
    }
}
