import {Injectable} from '@angular/core';
import {ApiResponse, Payload} from '@shared/model';
import {HttpService} from '@shared/service/http.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {environment} from '@env/index';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    baseUrl = environment.apiURL;

    constructor(public http: HttpService) {
    }

    get(partUrl: string): Observable<ApiResponse> {
        return this.http.get(`${this.baseUrl}${partUrl}`).pipe(map((response: any) => response as ApiResponse));
    }

    post(partUrl: string, payload: Payload, showToaster = false): Observable<ApiResponse> {
        return this.http.post(`${this.baseUrl}${partUrl}`, payload, showToaster).pipe(map((response: any) => response as ApiResponse));
    }

    put(partUrl: string, payload: Payload, showToaster = false): Observable<ApiResponse> {
        return this.http.put(`${this.baseUrl}${partUrl}`, payload, showToaster).pipe(map((response: any) => response as ApiResponse));
    }

    delete(partUrl: string, showToaster = false): Observable<ApiResponse> {
        return this.http.delete(`${this.baseUrl}${partUrl}`, showToaster).pipe(map((response: any) => response as ApiResponse));
    }

}

