import {Component} from '@angular/core';
import {FormType} from '@shared/module/form/model/enum';

@Component({
    selector: 'app-product-create-page',
    templateUrl: './product-create-page.component.html',
    styleUrls: ['./product-create-page.component.scss']
})
export class ProductCreatePageComponent {
    formType = FormType.CREATE;
}
