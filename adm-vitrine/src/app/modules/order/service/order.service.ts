import {Injectable} from '@angular/core';
import {ApiService, HttpService} from '@shared/service';
import {BehaviorSubject, Observable} from 'rxjs';
import {ApiResponse, ApiUri, MailData, Payload} from '@shared/model';
import {map, tap} from 'rxjs/operators';
import {MolliePaymentPayload, Order, OrderCreatePayload, OrderDto, OrderStatus, OrderUpdatePayload} from '../model';
import {OrderHelper} from '../helper';
import {BucketService} from '@security/service';
import {ToastType} from '@shared/module/toast/model';
import {Profile} from '@account/model';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends ApiService {
  list$: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>([]);
  showBucket$ = new BehaviorSubject<boolean>(false);
  bucket$: BehaviorSubject<Order> = new BehaviorSubject<Order>(OrderHelper.getEmpty());
  helper = OrderHelper;
  profile!: Profile;

  constructor(public override http: HttpService, public bucketService: BucketService) {
    super(http);
  }

  updateBucket(bucket: Order, showToaster = false): void {
    this.bucketService.save(bucket);
    if (showToaster) {
      this.bucketService.toaster.show(ToastType.SUCCESS, 'page.bucket.item-add');
    }
    this.initBucket();
  }

  initBucket(): void {
    this.bucket$.next(this.bucketService.get());
  }

  list(id: string): void {
    this.get(`${ApiUri.ORDER_LIST}${id}`).pipe(
      tap((response: ApiResponse) => {
        if (response.result) {
          const list = (response.data.length > 0) ? response.data.map((d: OrderDto) => this.helper.fromDTO(d, this.profile)) : [];
          list.filter((item: Order) => item.status !== OrderStatus.CLIENT_NOT_PAID)
          this.list$.next(list.filter((item: Order) => item.status !== OrderStatus.CLIENT_NOT_PAID));
        }
      }),
    ).subscribe();
  }

  detail(id: string): Observable<Order> {
    return this.get(`${ApiUri.ORDER_DETAIL}${id}`).pipe(
      map((response: ApiResponse) => (response.result) ? this.helper.fromDTO(response.data, this.profile) : this.helper.getEmpty())
    )
  }

  create(payload: OrderCreatePayload): Observable<Order> {
    return this.post(ApiUri.ORDER_CREATE, payload as Payload, true).pipe(
      map((response: ApiResponse) => (response.result) ? this.helper.fromDTO(response.data, this.profile) : this.helper.getEmpty())
    )
  }

  paid(payload: MolliePaymentPayload): Observable<ApiResponse> {
    return this.post(ApiUri.ORDER_PAID, payload as Payload, true);
  }

  update(payload: OrderUpdatePayload): Observable<Order> {
    return this.put(ApiUri.ORDER_UPDATE, payload as Payload, true).pipe(
      map((response: ApiResponse) => (response.result) ? this.helper.fromDTO(response.data, this.profile) : this.helper.getEmpty())
    )
  }

  finalize(payload: OrderUpdatePayload): Observable<Order> {
    return this.put(ApiUri.ORDER_FINALIZE, payload as Payload, true).pipe(
      map((response: ApiResponse) => (response.result) ? this.helper.fromDTO(response.data, this.profile) : this.helper.getEmpty())
    )
  }

  cancel(id: string): Observable<boolean> {
    return this.delete(`${ApiUri.ORDER_CANCEL}${id}`, true)
      .pipe(
        tap((response: ApiResponse) => this.list(id)),
        map((response: ApiResponse) => response.result)
      );
  }

  remove(id: string): Observable<boolean> {
    return this.delete(`${ApiUri.ORDER_DELETE}${id}`, true)
      .pipe(
        tap((response: ApiResponse) => this.list(id)),
        map((response: ApiResponse) => response.result)
      );
  }

  sendMail(payload: MailData): Observable<ApiResponse> {
    return this.post(ApiUri.ORDER_MAIL, payload as Payload, true);
  }

  webhook(id: string): Observable<ApiResponse> {
    return this.get(ApiUri.ORDER_WEBHOOK + id);
  }
}
