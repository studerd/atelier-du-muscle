import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {OrderService} from '@order/service/order.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'adm-vitrine';

  constructor(private translate: TranslateService, public orderService: OrderService) {
    translate.setDefaultLang('fr');
    translate.use('fr');
  }
}
