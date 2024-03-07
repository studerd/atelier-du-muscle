import {Component, Input} from '@angular/core';
import {DataViewTabConfig} from '@shared/module/data-view/model';

@Component({
    selector: 'app-data-tab-view',
    templateUrl: './data-tab-view.component.html',
    styleUrls: ['./data-tab-view.component.scss']
})
export class DataTabViewComponent {
    @Input() config!: DataViewTabConfig;

    setActive(index: number): void {
        this.config.activeTab = this.config.ids[index];
    }
}
