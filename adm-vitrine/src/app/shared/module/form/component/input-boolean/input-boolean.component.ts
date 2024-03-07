import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormInputConfig} from '@shared/module/form/model';
import {Business} from '@shared/model';
import {Subject} from 'rxjs';

@Component({
    selector: 'app-input-boolean',
    templateUrl: './input-boolean.component.html',
    styleUrls: ['./input-boolean.component.scss']
})
export class InputBooleanComponent implements OnInit, OnDestroy {
    @Input() config!: FormInputConfig<Business>;

    errors: string[] = [];
    destroyer$ = new Subject<void>();
    switched = false;

    constructor() {
    }

    ngOnInit(): void {
        this.switched = this.config.formControl.value;
    }

    ngOnDestroy(): void {
        this.destroyer$.next();
        this.destroyer$.complete();
    }

    changeType(): void {
        this.config.type = (this.config.type === 'password') ? 'text' : 'password';
    }

    toggleSwitch(): void {
        this.switched = !this.switched;
        this.config.formControl.patchValue(this.switched);
    }
}
