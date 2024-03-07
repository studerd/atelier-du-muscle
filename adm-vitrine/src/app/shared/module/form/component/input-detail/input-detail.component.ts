import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormInputConfig} from '@shared/module/form/model';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Business} from '@shared/model';
import {isNil} from 'lodash';

@Component({
  selector: 'app-input-detail',
  templateUrl: './input-detail.component.html',
  styleUrls: ['./input-detail.component.scss']
})
export class InputDetailComponent implements OnInit, OnChanges, OnDestroy {
  @Input() config!: FormInputConfig<Business>;
  @Output() onBlur = new EventEmitter<void>();
  type = 'password';
  errors: string[] = [];
  destroyer$ = new Subject<void>();
  phoneCountryFlag = '';
  phoneCountryCode = '';
  phoneValue = '';
  show = false;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!isNil(this.config) && this.config.type === 'phone') {
      const phone = this.config.formControl.value
      if (!isNil(phone) && phone.length > 0) {
        this.phoneCountryCode = (phone.startsWith('+352')) ? phone.substring(0, 4) : phone.substring(0, 3);
        this.phoneValue = phone.replace(this.phoneCountryCode, '');
        this.getFlag();
      }
    }
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

  patchValue(): void {
    this.config.formControl.patchValue(this.phoneCountryCode + this.phoneValue);
  }

  setCode(code: string) {
    this.phoneCountryCode = code;
    this.getFlag();
    this.patchValue();
    this.show = false;
  }

  private getFlag(): void {
    switch (this.phoneCountryCode) {
      case '+32':
        this.phoneCountryFlag = 'assets/flag/be.svg';
        break;
      case '+33':
        this.phoneCountryFlag = 'assets/flag/fr.svg';
        break;
      case '+31':
        this.phoneCountryFlag = 'assets/flag/nl.svg';
        break;
      case '+49':
        this.phoneCountryFlag = 'assets/flag/de.svg';
        break;
      case '+352':
        this.phoneCountryFlag = 'assets/flag/lu.svg';
        break;
    }
  }
}
