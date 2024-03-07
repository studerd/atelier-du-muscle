import {AfterContentChecked, ChangeDetectorRef, Component, Input} from '@angular/core';
import {DataViewerRouterConfig} from '../../model';
import {AppPageEnum, Business} from '@shared/model';
import {TooltipPosition} from '@shared/module/tooltip/model';

@Component({
    selector: 'app-data-viewer-router',
    templateUrl: './data-viewer-router.component.html',
    styleUrls: ['./data-viewer-router.component.scss']
})
export class DataViewerRouterComponent implements AfterContentChecked {
    @Input() config!: DataViewerRouterConfig;
    title = '';
    tooltipPosition = TooltipPosition;

    constructor(private cdref: ChangeDetectorRef) {}

    ngAfterContentChecked() {

        this.cdref.detectChanges();

    }

    detail(item: Business): void {
        this.config.navigation.navigate(`${AppPageEnum[`${this.config.dataService.entityName}_DETAIL` as keyof typeof AppPageEnum]}/${item.id}`);
    }

    create(): void {
        this.config.navigation.navigate(AppPageEnum[`${this.config.dataService.entityName}_CREATE` as keyof typeof AppPageEnum]);
    }
}
