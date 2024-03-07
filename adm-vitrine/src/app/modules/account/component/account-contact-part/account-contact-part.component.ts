import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ProfileDetailFormConfig} from '@account/model';

@Component({
  selector: 'app-account-contact-part',
  templateUrl: './account-contact-part.component.html',
  styleUrls: ['../account-identity-part/account-identity-part.component.scss']
})
export class AccountContactPartComponent {

  @Input() formConfig?: ProfileDetailFormConfig;
  @Output() onSave = new EventEmitter();

  save(): void {
    this.onSave.emit();
  }
}
