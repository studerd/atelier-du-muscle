import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {BehaviorSubject, of, Subject, switchMap} from 'rxjs';
import {isEmpty, isNil} from 'lodash';
import {OrderHelper} from '@order/helper';
import {tap} from 'rxjs/operators';
import {Order, OrderStatus, OrderUpdatePayload} from '@order/model';
import {AuthService} from '@security/service';
import {
  Address,
  AddressFormConfig,
  Profile,
  ProfileDetailFormConfig,
  ProfileUpdatePayload,
  VatCheck
} from '@account/model';
import {Credential} from '@security/model';
import {addressHelper, profileHelper} from '@account/helper';
import {ProfileService} from '@account/service/profile.service';
import {Address as GoogleAddress} from 'ngx-google-places-autocomplete/objects/address';


@Component({
  selector: 'app-order-detail-page',
  templateUrl: './order-detail-page.component.html',
  styleUrls: ['./order-detail-page.component.scss']
})
export class OrderDetailPageComponent implements OnInit {
  order$ = new BehaviorSubject<Order>(OrderHelper.getEmpty());
  loading$ = new BehaviorSubject<boolean>(true);
  orderStatus = OrderStatus;
  tvaFromOderCountry = true;
  totalPrice = 0;
  reductionTva = 0;

  constructor(public profileService: ProfileService, public authService: AuthService, public router: Router, public activatedRouter: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRouter.params.pipe(
      switchMap((params: Params) => {
        if (isNil(params['id'])) {
          return of(OrderHelper.getEmpty());
        }
        return this.authService.orderService.detail(params['id']);
      }),
      switchMap((data: Order) => {
        this.order$.next(data);
        return this.authService.account$;
      }),
      tap((client: Credential) => {
        const order = this.order$.getValue();
        this.tvaFromOderCountry = (!isEmpty(client.profile.vatNumber) && !client.profile.vatNumber.startsWith('BE'));
        if (this.tvaFromOderCountry) {
          this.reductionTva = (order.totalPrice + order.estimatedCost) / 121 * 21;
          this.totalPrice = (order.totalPrice + order.estimatedCost) / 1.21;
        } else {
          this.totalPrice = order.totalPrice + order.estimatedCost;
        }
        this.loading$.next(false);
        this.order$.next(order);
      })
    ).subscribe()
  }
  track(trackingURL: string): void {
    window.open(trackingURL, '_BLANK');
  }
}
