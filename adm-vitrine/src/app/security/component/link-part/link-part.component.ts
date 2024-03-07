import {Component, Input, OnInit} from '@angular/core';
import {AppPageEnum} from '@shared/model';
import {SecurityLink} from '@security/model';
import {NavigationService} from '@shared/service';

@Component({
    selector: 'app-link-part',
    templateUrl: './link-part.component.html',
    styleUrls: ['./link-part.component.scss']
})
export class LinkPartComponent implements OnInit {
    @Input() page: AppPageEnum = AppPageEnum.SIGNIN;
    links: SecurityLink[] = [];

    constructor(public navigation: NavigationService) {
    }

    ngOnInit(): void {
        switch (this.page) {
            case AppPageEnum.SIGNIN:
                this.setSigninLink();
                break;
            case AppPageEnum.SIGNUP:
                this.setSignupLink();
                break;
        }
    }

    onClick(page: AppPageEnum): void {
        this.navigation.navigate(page);
    }

    private setSigninLink(): void {
        this.links = [{
            link: AppPageEnum.SIGNUP,
            clickable: 'page.signup.link.clickable',
            accroche: 'page.signup.link.accroche'
        }]
    }

    private setSignupLink(): void {
        this.links = [{
            link: AppPageEnum.SIGNIN,
            clickable: 'page.signin.link.clickable',
            accroche: 'page.signin.link.accroche'
        }]
    }
}
