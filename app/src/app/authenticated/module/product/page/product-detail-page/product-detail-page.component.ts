import { Component } from '@angular/core';
import {FormType} from '@shared/module/form/model/enum';

@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.scss']
})
export class ProductDetailPageComponent {
  formType = FormType.UPDATE;
}
