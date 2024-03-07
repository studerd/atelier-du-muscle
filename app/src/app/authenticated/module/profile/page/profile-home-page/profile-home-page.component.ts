import {Component} from '@angular/core';
import {AppPageEnum} from '@shared/model';
import {ProfileService} from '@profile/service/profile.service';
import {DataViewerHomeConfig} from '@shared/module/data-view/model';

@Component({
    selector: 'app-profile-home-page',
    templateUrl: './profile-home-page.component.html',
    styleUrls: ['./profile-home-page.component.scss']
})
export class ProfileHomePageComponent {
    translateKey = 'page.profile-home.';
    config!: DataViewerHomeConfig;

    constructor(public dataService: ProfileService) {
    }

    ngOnInit() {
        this.config = {
            translateKey: 'page.profile-home.',
            createPageEnum: AppPageEnum.PROFILE_CREATE,
            list$: this.dataService.list$
        }
        this.dataService.list();
    }

}
