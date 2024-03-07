import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '@security/service/auth.service';
import {forkJoin, Subject, switchMap} from 'rxjs';
import {takeUntil, tap} from 'rxjs/operators';
import {Credential} from '@security/model';
import {
  AddressValidationPayload,
  Profile,
  ProfileDetailFormConfig,
  ProfileUpdatePayload,
  VatCheck
} from '@account/model';
import {addressHelper, profileHelper} from '@account/helper';
import {ProfileService} from '@account/service/profile.service';
import {isNil} from 'lodash';


@Component({
  selector: 'app-account-home-page',
  templateUrl: './account-home-page.component.html',
  styleUrls: ['./account-home-page.component.scss']
})
export class AccountHomePageComponent implements OnInit, OnDestroy {
  tabs: { title: string, icon: string }[] = [];
  currentTab = 'order';
  destroyer$ = new Subject<void>();
  detailFormConfig?: ProfileDetailFormConfig;
  profile: Profile = profileHelper.getEmpty();

  constructor(public authService: AuthService, public profileService: ProfileService) {

  }

  ngOnInit(): void {
    this.initTab();
    this.authService.account$.pipe(
      takeUntil(this.destroyer$),
      tap((account: Credential) => {
        this.detailFormConfig = profileHelper.toDetailConfig(account.profile)
        this.profile = account.profile;
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroyer$.next();
    this.destroyer$.complete();
  }

  changeTab(tab: string): void {
    this.currentTab = tab;
  }

  deleteAccount(): void {
    this.authService.remove().subscribe();
  }

  logout(): void {
    this.authService.logout();
  }

  save(): void {
    const payload: ProfileUpdatePayload = profileHelper.formConfigToUpdatePayload(this.profile, this.detailFormConfig!)
    if (!isNil(payload.vatNumber) && payload.vatNumber != this.profile.vatNumber) {
      this.profileService.checkVat(payload.vatNumber)
        .pipe(
          switchMap((data: VatCheck) => {
            if (!data.checksum_valid) {
              payload.vatNumber = '';
            }
            return this.profileService.update(payload);
          }), switchMap(() => this.authService.me())).subscribe();
    } else {
      this.profileService.update(payload).pipe(switchMap(() => this.authService.me())).subscribe();
    }

  }

  private initTab(): void {
    this.tabs = [
      {title: 'identity', icon: 'fa-light fa-address-card'},
      {title: 'contact', icon: 'fa-light fa-at'},
      {title: 'address', icon: 'fa-light fa-location-dot'},
      {title: 'password', icon: 'fa-light fa-key-skeleton'},
      {title: 'order', icon: 'fa-light fa-bag-shopping'},
      {title: 'parameters', icon: 'fa-light fa-gear'}];
  }
}
