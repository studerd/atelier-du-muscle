import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormInputConfig} from '@shared/module/form/model';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Business} from '@shared/model';

@Component({
    selector: 'app-input-detail',
    templateUrl: './input-detail.component.html',
    styleUrls: ['./input-detail.component.scss']
})
export class InputDetailComponent implements OnInit, OnDestroy {
    @Input() config!: FormInputConfig<Business>;
    type = 'password';
    errors: string[] = [];
    destroyer$ = new Subject<void>();

    constructor() {
    }

    ngOnInit(): void {
        this.type = this.config.type;
        this.errors = (this.config.formControl.errors) ? Object.keys(this.config.formControl.errors) : [];
        this.config.formControl.valueChanges.pipe(takeUntil(this.destroyer$))
            .subscribe(() => {
                this.errors = (this.config.formControl.errors) ? Object.keys(this.config.formControl.errors) : [];
            });
    }

    ngOnDestroy(): void {
        this.destroyer$.next();
        this.destroyer$.complete();
    }

    changeType(): void {
        this.config.type = (this.config.type === 'password') ? 'text' : 'password';
    }
}
