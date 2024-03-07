import {Component} from '@angular/core';
import {profileHelper} from '@account/helper';
import {ChangePasswordFormConfig, ChangePasswordPayload} from '@account/model';
import {ToastService} from '@shared/module/toast/service/toast.service';
import {ToastType} from '@shared/module/toast/model';
import {AuthService} from '@security/service/auth.service';

@Component({
  selector: 'app-account-password-part',
  templateUrl: './account-password-part.component.html',
  styleUrls: ['./account-password-part.component.scss', '../account-identity-part/account-identity-part.component.scss']
})
export class AccountPasswordPartComponent {
  formConfig: ChangePasswordFormConfig = profileHelper.changePasswordFormConfig();

  constructor(public toaster: ToastService, public authService: AuthService) {
  }

  change(): void {
    if (this.formConfig.formGroup.invalid) {
      this.toaster.show(ToastType.ERROR, "page.account-home.error.change-password");

    } else {
      const payload: ChangePasswordPayload = this.formConfig.formGroup.value;
      if (payload.newOne !== payload.confirmation) {
        this.toaster.show(ToastType.ERROR, "page.account-home.error.change-password");
      } else {
        this.authService.changePassword(payload);
      }
    }
  }
}
