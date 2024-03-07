import {Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges} from '@angular/core';
import {AddressFormConfig} from '@account/model';
import {addressHelper} from '@account/helper';
import {BehaviorSubject, Subject} from 'rxjs';
import {takeUntil, tap} from 'rxjs/operators';
import {ProfileService} from '@account/service/profile.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-account-address-part',
  templateUrl: './account-address-part.component.html',
  styleUrls: ['./account-address-part.component.scss', '../account-identity-part/account-identity-part.component.scss']
})
export class AccountAddressPartComponent implements OnDestroy, OnChanges {
  @Input() formConfig: AddressFormConfig[] = [];
  @Output() onSave = new EventEmitter();
  destroyer$ = new Subject<void>();
  valid$ = new BehaviorSubject<string>('Y');
  error: string[] = [];

  constructor(public profileService: ProfileService, public translate: TranslateService) {
  }

  ngOnDestroy(): void {
    this.destroyer$.next();
    this.destroyer$.complete();
  }

  add(): void {
    this.formConfig.unshift(addressHelper.toDetailConfig(addressHelper.getEmpty()));
    this.listenOnForm();
  }

  save(): void {
    this.onSave.emit();
  }

  remove(index: number): void {
    this.formConfig.splice(index, 1);
    this.listenOnForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.listenOnForm();
  }

  private listenOnForm(): void {
    this.destroyer$.next();
    this.destroyer$.complete();
    this.error = Array.from(this.formConfig.map(a => (a.formGroup.valid) ? 'Y' : 'N'));
    this.setValidators();
    for (let i = 0; i < this.formConfig.length; i++) {
      this.formConfig[i].formGroup.valueChanges.pipe(
        takeUntil(this.destroyer$),
        tap((value) => {
          console.log('coucou petite peruche');
          this.error[i] = (this.formConfig[i].formGroup.valid) ? 'Y' : 'N';
          this.formConfig[i].isValid = false;
          this.setValidators();
        })
      ).subscribe()
    }
  }

  private setValidators(): void {
    this.valid$.next(this.error.filter(v => v != 'Y').length === 0 ? 'Y' : 'N');
  }
}
