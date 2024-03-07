import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormInputConfig} from '../../model';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Business, Dto} from '@shared/model';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
})
export class FormInputComponent implements OnInit, OnDestroy {
  @Input() config!: FormInputConfig<Business>;
  type = 'password';
  errors:string[] = [];
  destroyer$ = new Subject<void>();

  constructor() {
  }

  ngOnInit() {
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
