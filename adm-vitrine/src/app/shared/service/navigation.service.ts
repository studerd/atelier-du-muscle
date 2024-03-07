import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject, Subject} from 'rxjs';
import {LabelWithParam} from '@shared/model/label-with-param.interface';
import {AppPageEnum, AppPageTitleEnum} from '@shared/model';
import {DataViewerActionConfig} from '@shared/module/data-view/model';

@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    title$: BehaviorSubject<LabelWithParam> = new BehaviorSubject<LabelWithParam>({label: 'common.app-name'});
    actions$: Subject<DataViewerActionConfig[]> = new Subject<DataViewerActionConfig[]>();

    constructor(public router: Router) {
    }

    navigate(path: string): void {
        this.router.navigate([path]).then();
    }

    navigateToUnsecure(): void {
        if (window.location.pathname.startsWith('/acc/signin') || window.location.pathname.startsWith('/acc/signup')) {
            this.navigate(window.location.pathname);
        } else {
            this.navigate('acc');
        }
    }

    navigateToSecure(goToShop:boolean): void {
      if(goToShop){
        this.navigate('/bucket');
      }else{
        if (window.location.pathname.startsWith('/account')) {
          this.navigate(window.location.pathname);
        } else {
          this.navigate('/account');
        }
      }
    }

    findRightTitle(evt: any): void {
        let enumArr = Object.values(AppPageEnum);
        let found = false;
        let key: string = '';
        let url = evt.url.substring(1, evt.url.lastIndexOf('/'));
        const nbPath = url.split('/').length - 1;
        for (let i = 0; i < nbPath && !found; i++) {
            found = enumArr.indexOf(url) > 0;
            if (found) {
                key = AppPageTitleEnum[Object.keys(AppPageEnum)[enumArr.indexOf(url)] as keyof typeof AppPageTitleEnum].toString();
            } else {
                url = url.substring(0, url.lastIndexOf('/'));
            }
        }
        if (key.length > 0) {
            this.title$.next({label: key})
        } else {
            this.title$.next({label: 'common.app-name'})
        }
    }
}
