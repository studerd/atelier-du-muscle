import {BehaviorSubject, Observable} from 'rxjs';
import {ApiService} from '@shared/service/index';
import {map, tap} from 'rxjs/operators';
import {ApiResponse, ApiUri, Business, Payload} from '@shared/model';
import {Helper} from '@shared/contract';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CrudService<BUSINESS, DTO, ID, CREATE_PAYLOAD, UPDATE_PAYLOAD, DETAIL_FORM_CONFIG> extends ApiService {
    list$: BehaviorSubject<BUSINESS[]> = new BehaviorSubject<BUSINESS[]>([]);
    helper!: Helper<BUSINESS, DTO, DETAIL_FORM_CONFIG>;
    entityName!: string;

    list(): void {
        this.get(ApiUri[`${this.entityName}_LIST` as keyof typeof ApiUri]).pipe(
            map((response: ApiResponse) => {
                const list = (response.data.length > 0) ? response.data.map((d: DTO) => this.helper.fromDTO(d)) : [];
                list.sort((a:Business,b:Business)=> a.str.localeCompare(b.str))
                return list;
            }),
            tap((list: BUSINESS[]) => this.list$.next(list)),
        ).subscribe();
    }

    detail(id: ID): Observable<BUSINESS> {
        return this.get(`${ApiUri[`${this.entityName}_DETAIL` as keyof typeof ApiUri]}${id}`).pipe(
            map((response: ApiResponse) => (response.result) ? this.helper.fromDTO(response.data) : this.helper.getEmpty())
        )
    }

    create(payload: CREATE_PAYLOAD): Observable<BUSINESS> {
        return this.post(ApiUri[`${this.entityName}_CREATE` as keyof typeof ApiUri], payload as Payload, true).pipe(
            map((response: ApiResponse) => (response.result) ? this.helper.fromDTO(response.data) : this.helper.getEmpty())
        )
    }

    update(payload: UPDATE_PAYLOAD): Observable<BUSINESS> {
        return this.put(ApiUri[`${this.entityName}_UPDATE` as keyof typeof ApiUri], payload as Payload, true).pipe(
            map((response: ApiResponse) => (response.result) ? this.helper.fromDTO(response.data) : this.helper.getEmpty())
        )
    }

    remove(id: ID): Observable<boolean> {
        return this.delete(`${ApiUri[`${this.entityName}_DELETE` as keyof typeof ApiUri]}${id}`, true)
            .pipe(
                tap((response: ApiResponse) => this.list()),
                map((response: ApiResponse) => response.result)
            );
    }
}