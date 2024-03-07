import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Business} from '@shared/model';
import {DataViewerListConfig} from '@shared/module/data-view/model';
import {Subject} from 'rxjs';
import {takeUntil, tap} from 'rxjs/operators';
import {TooltipPosition} from '@shared/module/tooltip/model';

@Component({
    selector: 'app-data-viewer-table',
    templateUrl: './data-viewer-table.component.html',
    styleUrls: ['./data-viewer-table.component.scss']
})
export class DataViewerTableComponent implements OnInit, OnDestroy {
    @Input() config?: DataViewerListConfig;
    data: any[] = [];
    destroyer$ = new Subject<void>();
    tooltipPosition = TooltipPosition;

    ngOnDestroy(): void {
        this.destroyer$.complete();
        this.destroyer$.next();
    }

    ngOnInit(): void {
        this.config?.data.pipe(
            takeUntil(this.destroyer$),
            tap((data: Business[]) => this.data = data)
        ).subscribe();
    }

    onSave(): void {
        this.config!.save!.save(this.config!.formConfig?.formGroup);
    }
}
