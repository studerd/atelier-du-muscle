import {Component, OnInit} from '@angular/core';
import {DataViewerRouterConfig} from '@shared/module/data-view/model';
import {NavigationService} from '@shared/service';
import {ProfileService} from '@profile/service/profile.service';

@Component({
    selector: 'app-profile-router',
    templateUrl: './profile-router.component.html',
    styleUrls: ['./profile-router.component.scss']
})
export class ProfileRouterComponent implements OnInit {
    config!: DataViewerRouterConfig;

    constructor(public navigation: NavigationService, public dataService: ProfileService) {
    }

    ngOnInit(): void {
        this.dataService.list();
        this.config = {
            dataService: this.dataService,
            navigation: this.navigation,
            translateKey: 'page.profile-home.',
            showSideBar:true
        }
    }

}
