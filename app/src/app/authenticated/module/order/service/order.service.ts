import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ApiResponse, ApiUri, Payload} from '@shared/model';
import {map, tap} from 'rxjs/operators';
import {ApiService, HttpService} from '@shared/service';
import {Order, OrderCreatePayload, OrderDto, OrderStatus, OrderUpdatePayload} from '@order/model';
import {OrderHelper} from '@order/helper';

@Injectable({
    providedIn: 'root'
})
export class OrderService extends ApiService {
    list$: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>([]);
    bucket$: BehaviorSubject<Order> = new BehaviorSubject<Order>(OrderHelper.getEmpty());
    helper = OrderHelper;

    constructor(public override http: HttpService) {
        super(http);
    }

    list(): void {
        this.get(`${ApiUri.ORDER_LIST}`).pipe(
            tap((response: ApiResponse) => {
                if (response.result) {
                    this.list$.next((response.data.length > 0) ? response.data.map((d: OrderDto) => this.helper.fromDTO(d)) : [])
                }
            }),
        ).subscribe();
    }

    listForProfile(id: string): Observable<Order[]> {
        return this.get(`${ApiUri.ORDER_LIST}/${id}`).pipe(
            map((response: ApiResponse) => {
                if (response.result) {
                    return (response.data.length > 0) ? response.data.map((d: OrderDto) => this.helper.fromDTO(d)) : [];
                }
                return [];
            }),
        )
    }

    status(status: OrderStatus): void {
        this.get(`${ApiUri.ORDER_LIST_STATUS}${status}`).pipe(
            tap((response: ApiResponse) => {
                if (response.result) {
                    this.list$.next((response.data.length > 0) ? response.data.map((d: OrderDto) => this.helper.fromDTO(d)) : [])
                }
            }),
        ).subscribe();
    }

    detail(id: string): Observable<Order> {
        return this.get(`${ApiUri.ORDER_DETAIL}${id}`).pipe(
            map((response: ApiResponse) => (response.result) ? this.helper.fromDTO(response.data) : this.helper.getEmpty())
        )
    }

    create(payload: OrderCreatePayload): Observable<Order> {
        return this.post(ApiUri.ORDER_CREATE, payload as Payload, true).pipe(
            map((response: ApiResponse) => (response.result) ? this.helper.fromDTO(response.data) : this.helper.getEmpty())
        )
    }

    update(payload: OrderUpdatePayload): Observable<Order> {
        return this.put(ApiUri.ORDER_UPDATE, payload as Payload, true).pipe(
            map((response: ApiResponse) => (response.result) ? this.helper.fromDTO(response.data) : this.helper.getEmpty())
        )
    }

    changeStatus(payload: OrderUpdatePayload): Observable<Order> {
        return this.put(ApiUri.ORDER_CHANGE_STATUS, payload as Payload, true).pipe(
            map((response: ApiResponse) => (response.result) ? this.helper.fromDTO(response.data) : this.helper.getEmpty())
        )
    }

    remove(id: string): Observable<boolean> {
        return this.delete(`${ApiUri.ORDER_DELETE}${id}`, true)
            .pipe(
                tap((response: ApiResponse) => this.list()),
                map((response: ApiResponse) => response.result)
            );
    }
}
