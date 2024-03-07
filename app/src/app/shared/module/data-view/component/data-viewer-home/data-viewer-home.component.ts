import {Component, Input, OnInit} from '@angular/core';
import {NavigationService} from '@shared/service';
import {DataViewerHomeConfig} from '@shared/module/data-view/model';

@Component({
    selector: 'app-data-viewer-home',
    templateUrl: './data-viewer-home.component.html',
    styleUrls: ['./data-viewer-home.component.scss']
})
export class DataViewerHomeComponent implements OnInit {
    @Input() config!: DataViewerHomeConfig;

    constructor(public navigationService: NavigationService) {
    }

    ngOnInit(): void {
        this.navigationService.title$.next({label: `${this.config.translateKey}title`});
    }


    goCreate(): void {
        this.navigationService.navigate(this.config.createPageEnum);
    }

}
