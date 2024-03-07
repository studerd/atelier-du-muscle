import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-account-parameter-part',
  templateUrl: './account-parameter-part.component.html',
  styleUrls: ['./account-parameter-part.component.scss']
})
export class AccountParameterPartComponent {
  @Output() onLogout = new EventEmitter();
  @Output() onDeleteAccount = new EventEmitter();

  logout(): void {
    this.onLogout.emit();
  }

  delete(): void {
    this.onDeleteAccount.emit();
  }
}
