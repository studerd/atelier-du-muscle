import { Component } from '@angular/core';
import {FormType} from '@shared/module/form/model/enum';

@Component({
  selector: 'app-profile-create-page',
  templateUrl: './profile-create-page.component.html',
  styleUrls: ['./profile-create-page.component.scss']
})
export class ProfileCreatePageComponent {
  formMode = FormType.CREATE;
}
