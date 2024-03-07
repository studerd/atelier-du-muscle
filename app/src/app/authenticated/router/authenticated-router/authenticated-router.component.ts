import {Component, OnInit} from '@angular/core';
import {AuthService} from '@security/service/auth.service';
import {AppPageEnum, MenuLinkItem} from '@shared/model';
import {TooltipPosition} from '@shared/module/tooltip/model';

@Component({
    selector: 'app-authenticated-router',
    templateUrl: './authenticated-router.component.html',
    styleUrls: ['./authenticated-router.component.scss']
})
export class AuthenticatedRouterComponent implements OnInit {
    showMenu: boolean = false;
    menu: MenuLinkItem[] = [];
    position = TooltipPosition

    constructor(public authService: AuthService) {
    }

    ngOnInit(): void {
        this.initMenu();
    }

    initMenu(): void {
        this.menu = [
            {icon: 'fa-clipboard-list', title: {label: 'menu.program'}, link: AppPageEnum.ORDER_HOME},
            {icon: 'fa-user', title: {label: 'menu.profile'}, link: AppPageEnum.PROFILE_HOME},
            {icon: 'fa-table-cells-large', title: {label: 'menu.exercise-category'}, link: AppPageEnum.PRODUCT_HOME}
        ]
    }

    navigate(link: AppPageEnum) {
        this.authService.navigation.navigate(link);
    }
}
