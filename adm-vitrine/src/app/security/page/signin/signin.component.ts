import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '@security/service/auth.service';
import {SigninPayload, SigninPayloadFormGroup} from '@security/model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject, Subject} from 'rxjs';
import {takeUntil, tap} from 'rxjs/operators';
import {ToastService} from '@shared/module/toast/service/toast.service';
import {ToastType} from '@shared/module/toast/model';
import {ApiResponse, AppPageEnum} from '@shared/model';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit, OnDestroy {
    userNameFocus = false;
    passwordFocus = false;
    payload: SigninPayload = {username: '', password: ''}
    formGroup!: FormGroup;
    destroyer$ = new Subject<void>();
    loading$ = new BehaviorSubject<boolean>(true);
    pageEnum = AppPageEnum;

    constructor(public auth: AuthService, public toaster: ToastService) {
    }

    ngOnInit(): void {
        this.formGroup = new FormGroup<SigninPayloadFormGroup>({
            username: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),

        })
        this.formGroup.valueChanges.pipe(
            takeUntil(this.destroyer$),
            tap((data: SigninPayload) => this.payload = data)
        ).subscribe();
        this.loading$.next(false);
    }

    ngOnDestroy(): void {
        this.destroyer$.next();
        this.destroyer$.complete();
    }

    signin(): void {
        if (this.formGroup.invalid) {
            this.toaster.show(ToastType.ERROR, 'page.signin.validation.desc-error', 'page.signin.validation.title-error', 6000);
        } else {

            this.auth.signin(this.formGroup.value).subscribe((response: ApiResponse) => {
                if (!response.result) {
                    this.toaster.show(ToastType.ERROR, response.code, '', 6000);
                }
            })
        }
    }
}
