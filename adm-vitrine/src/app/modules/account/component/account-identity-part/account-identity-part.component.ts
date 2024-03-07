import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ProfileDetailFormConfig} from '@account/model';

@Component({
  selector: 'app-account-identity-part',
  templateUrl: './account-identity-part.component.html',
  styleUrls: ['./account-identity-part.component.scss']
})
export class AccountIdentityPartComponent {
  @Input() formConfig?: ProfileDetailFormConfig;
  @Output() onSave = new EventEmitter();

  save(): void {
    this.onSave.emit();
  }
}
