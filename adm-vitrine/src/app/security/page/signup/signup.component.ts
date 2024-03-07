import {Component, OnDestroy, OnInit} from '@angular/core';
import {SignupPayload, SignupPayloadFormGroup} from '@security/model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject, Subject} from 'rxjs';
import {ApiResponse, AppPageEnum} from '@shared/model';
import {AuthService} from '@security/service/auth.service';
import {ToastService} from '@shared/module/toast/service/toast.service';
import {takeUntil, tap} from 'rxjs/operators';
import {ToastType} from '@shared/module/toast/model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss', '../signin/signin.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  userNameFocus = false;
  passwordFocus = false;
  codeFocus = false;
  payload: SignupPayload = {username: '', password: '', code: '5a44a39e-6778-4d80-9c78-0b072a75d419'}
  formGroup!: FormGroup;
  destroyer$ = new Subject<void>();
  loading$ = new BehaviorSubject<boolean>(true);
  pageEnum = AppPageEnum;
  passwordType = 'password';

  constructor(public auth: AuthService, public toaster: ToastService, public router: Router) {
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup<SignupPayloadFormGroup>({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      code: new FormControl('MURPH@2023', [Validators.required]),

    })
    this.formGroup.valueChanges.pipe(
      takeUntil(this.destroyer$),
      tap((data: SignupPayload) => this.payload = data)
    ).subscribe();
    this.loading$.next(false);
  }

  ngOnDestroy(): void {
    this.destroyer$.next();
    this.destroyer$.complete();
  }

  signup(): void {
    if (this.formGroup.invalid) {
      this.toaster.show(ToastType.ERROR, 'page.signup.validation.desc-error', 'page.signup.validation.title-error', 6000);
    } else {
      this.loading$.next(true);

      this.payload = this.formGroup.value;
      this.auth.signup(this.formGroup.value).subscribe((response: ApiResponse) => {
        this.loading$.next(false);
        if (!response.result) {
          this.toaster.show(ToastType.ERROR, response.code, '', 6000);
        } else {
          this.router.navigate([AppPageEnum.SIGNIN]).then();
        }
      })
    }
  }

  showPassword(): void {
    this.passwordType = (this.passwordType === 'password') ? 'text' : 'password';
  }

}
