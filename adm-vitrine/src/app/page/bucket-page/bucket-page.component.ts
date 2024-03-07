import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {OrderService} from '@order/service/order.service';
import {MolliePaymentPayload, Order, OrderCreatePayload, OrderStatus, PaymentMethod} from '@order/model';
import {OrderHelper} from '@order/helper';
import {AuthService} from '@security/service';
import {ApiResponse} from '@shared/model';
import {format} from 'date-fns';
import {Address as GoogleAddress} from 'ngx-google-places-autocomplete/objects/address';
import {
  Address,
  AddressFormConfig,
  Profile,
  ProfileDetailFormConfig,
  ProfileUpdatePayload,
  VatCheck
} from '@account/model';
import {addressHelper, profileHelper} from '@account/helper';
import {isEmpty, isNil} from 'lodash';
import {switchMap} from 'rxjs';
import {ProfileService} from '@account/service/profile.service';
import {Credential} from '@security/model';

@Component({
  selector: 'app-bucket-page',
  templateUrl: './bucket-page.component.html',
  styleUrls: ['./bucket-page.component.scss']
})
export class BucketPageComponent {
  totalPrice = 0;
  bucket: Order = OrderHelper.getEmpty();
  isAuthenticated = false;
  success = false;
  estimatedCost = 0;
  orderId = '42cb20db-1d03-4a4e-ac7f-17699f0b82fe';
  detailFormConfig!: ProfileDetailFormConfig;
  profile: Profile = profileHelper.getEmpty();
  reductionTva = 0;
  fullTotal = 0;
  tvaFromOderCountry = true;
  options: any = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  }

  constructor(public authService: AuthService, public profileService: ProfileService, public router: Router, public orderService: OrderService) {
  }

  ngOnInit(): void {
    this.orderService.bucket$.subscribe((bucket: Order) => {
      this.bucket = bucket;
      if (this.bucket.lines.length > 0) {
        this.totalPrice = OrderHelper.getTotalPrice(this.bucket);
        this.estimatedCost = OrderHelper.calculateEstimatedCost(this.bucket);
      } else {
        this.totalPrice = 0;
      }
      this.orderService.showBucket$.next(false);
      const profile = this.authService.account$.getValue().profile;
      if (profile.address.length > 0) {
        if(isNil(this.bucket.billingAddress)){
          this.bucket.billingAddress = profile.address[0];
          this.orderService.updateBucket(this.bucket);
        }
        if(isNil(this.bucket.delivryAddress)){
          this.bucket.delivryAddress = profile.address[0];
          this.orderService.updateBucket(this.bucket);
        }

      }
    })
    this.authService.isAuthenticated$.subscribe((isAuthenticated: boolean) => {
      this.isAuthenticated = isAuthenticated;
    })
    this.authService.account$.subscribe((account: Credential) => {
      this.profile = account.profile;
      this.detailFormConfig = profileHelper.toDetailConfig(this.authService.account$.getValue().profile);
      if (this.profile.address.length > 0) {
        this.bucket.billingAddress = this.profile.address[0];
        this.bucket.delivryAddress = this.profile.address[0];
        this.orderService.updateBucket(this.bucket);
      }
      this.tvaFromOderCountry = (!isEmpty(this.profile.vatNumber) && !this.profile.vatNumber.startsWith('BE'));

      if (this.tvaFromOderCountry) {
        this.reductionTva = (this.totalPrice + this.estimatedCost) / 121 * 21;
        this.fullTotal = (this.totalPrice + this.estimatedCost) / 1.21;
      } else {
        this.reductionTva = 0;
        this.fullTotal = (this.totalPrice + this.estimatedCost);
      }
    })
  }

  goShopping() {
    this.router.navigate(['/shop']).then();
  }

  delete(index: number) {
    this.bucket.lines.splice(index, 1);
    this.orderService.updateBucket(this.bucket);
  }

  validate(): void {
    if (this.isAuthenticated) {
      const order = this.bucket;
      order.profile = this.authService.account$.getValue().profile;
      order.isEmpty = false;
      order.status = OrderStatus.WAITING_CLIENT_FINALIZATION;
      console.log('bucket', this.bucket);
      const newOne: OrderCreatePayload = OrderHelper.businessToCreatePayload(this.bucket);
      const molliePayment: MolliePaymentPayload = {
        payload: newOne,
        author: newOne.profile.profile_id!,
        amount: {value: parseFloat(String(this.fullTotal)).toFixed(2), currency: 'EUR'},
        method: PaymentMethod.BANCONTACT,
        payment_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss')
      }
      this.orderService.paid(molliePayment).subscribe((data: ApiResponse) => {
        if (data.result) {
          if (data.data._links && data.data._links.checkout) {
            window.location.href = data.data._links.checkout.href;
          }
          console.log('my mollie data ', data);
        } else {
          console.log('show error');
        }
      });
    }

  }

  handleAddressChange(address: GoogleAddress) {
    const newItem: AddressFormConfig = addressHelper.toDetailConfig(addressHelper.getEmpty());
    if (address.address_components.length === 7) {
      newItem.latitude = address.geometry.location.lat().toString();
      newItem.longitude = address.geometry.location.lng().toString();
      newItem.nb.formControl.patchValue(address.address_components[0].long_name);
      newItem.road.formControl.patchValue(address.address_components[1].long_name);
      newItem.town.formControl.patchValue(address.address_components[2].long_name);
      newItem.country.formControl.patchValue(address.address_components[5].long_name);
      newItem.cp.formControl.patchValue(address.address_components[6].long_name);
      newItem.longitude = address.geometry.location.lng().toString();
      this.detailFormConfig.address.push(newItem);
      this.save();
    }
  }

  setDeliveryAdress(address: Address): void {
    this.bucket.delivryAddress = address;

  }

  setBillingAdress(address: Address): void {
    this.bucket.billingAddress = address;
  }

  save(): void {
    const payload: ProfileUpdatePayload = profileHelper.formConfigToUpdatePayload(this.profile, this.detailFormConfig!);
    console.log('payload', payload);
   if (!isNil(payload.vatNumber) && payload.vatNumber != this.profile.vatNumber) {
      this.profileService.checkVat(payload.vatNumber)
        .pipe(
          switchMap((data: VatCheck) => {
            if (!data.checksum_valid) {
              payload.vatNumber = '';
            }
            return this.profileService.update(payload);
          }), switchMap(() => this.authService.me())).subscribe();
    } else {
      this.profileService.update(payload).pipe(switchMap(() => this.authService.me())).subscribe();
    }

  }

  removeAddress(index: number) {
    this.detailFormConfig.address.splice(index,1);
    this.save();
  }
}
