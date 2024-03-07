import {Component} from '@angular/core';
import {FormType} from '@shared/module/form/model/enum';

@Component({
    selector: 'app-profile-detail-page',
    templateUrl: './profile-detail-page.component.html',
    styleUrls: ['./profile-detail-page.component.scss']
})
export class ProfileDetailPageComponent {
    formMode = FormType.UPDATE;
}
