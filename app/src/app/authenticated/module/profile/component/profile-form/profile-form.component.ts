import {Component, Input, OnInit} from '@angular/core';
import {DataViewerDetailComponent} from '@shared/module/data-view/component';
import {Profile, ProfileDetailFormConfig, ProfileDto} from '@profile/model';
import {profileHelper} from '@profile/helper/profile.helper';
import {FormType} from '@shared/module/form/model/enum';
import {ActivatedRoute, Router} from '@angular/router';
import {NavigationService} from '@shared/service';
import {ProfileService} from '@profile/service/profile.service';
import {switchMap, tap} from 'rxjs/operators';
import {OrderService} from '@order/service/order.service';
import {Order} from '@order/model';
import {BehaviorSubject} from 'rxjs';

@Component({
    selector: 'app-profile-form',
    templateUrl: './profile-form.component.html',
    styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent extends DataViewerDetailComponent<Profile, ProfileDto, ProfileDetailFormConfig> implements OnInit {
    override helper = profileHelper
    @Input() override formMode = FormType.CREATE;
    orders$ = new BehaviorSubject<Order[]>([]);

    public constructor(public activatedRouter: ActivatedRoute,
                       public orderService: OrderService,
                       public nav: NavigationService,
                       public router: Router,
                       public profileService: ProfileService) {
        super(activatedRouter, nav, profileService);
    }

    override ngOnInit() {
        super.ngOnInit();
        this.detail$.pipe(
            switchMap((detail: Profile) => this.orderService.listForProfile(detail.id)),
            tap((orders: Order[]) => this.orders$.next(orders))
        ).subscribe();
    }


    go(id: string): void {
        this.router.navigate(['dashboard/order/detail/' + id]).then();
    }
}
