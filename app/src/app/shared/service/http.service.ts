import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, finalize, tap} from 'rxjs/operators';
import {ApiResponse, Payload} from '@shared/model';
import {ToastService} from '@shared/module/toast/service/toast.service';
import {ToastType} from '@shared/module/toast/model';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    loadingEmitter: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient, public toaster: ToastService) {
    }

    public errorHandler(error: { error: { message: any }; status: any; message: any }): Observable<ApiResponse> {
        console.log('error', error);
        if (error.error instanceof ErrorEvent) {
            return of({result: false, data: null, code: 'api.fatal-error'});
        } else {
            return of({result: false, data: null, code: 'api.fatal-error'});
        }
    }

    public get(url: string): Observable<any> {
        return this.http.get(url).pipe(
            catchError((error: { error: { message: any }; status: any; message: any }) => {
                return this.errorHandler(error);
            }),
            finalize(() => {
                this.loadingEmitter.next(false);
            })
        );
    }

    public post(url: string, data: Payload, showToaster = false): Observable<any> {
        this.loadingEmitter.next(true);
        return this.http.post(url, data).pipe(
            tap((data: any) => {
                if (showToaster) {
                    this.toaster.showFromApiResponse(data as ApiResponse);
                }
            }),
            catchError((error: { error: { message: any }; status: any; message: any }) => {
                if (showToaster) {
                    this.toaster.show(ToastType.ERROR, 'api.error-404');
                }
                return this.errorHandler(error);
            }),
            finalize(() => {
                this.loadingEmitter.next(false);
            })
        );
    }

    public put(url: string, data: Payload, showToaster = false): Observable<any> {
        this.loadingEmitter.next(true);
        return this.http.put(url, data).pipe(
            tap((data: any) => {
                if (showToaster) {
                    this.toaster.showFromApiResponse(data as ApiResponse);
                }
            }),
            catchError((error: { error: { message: any }; status: any; message: any }) => {
                if (showToaster) {
                    this.toaster.show(ToastType.ERROR, 'api.error-404');
                }
                return this.errorHandler(error);
            }),
            finalize(() => {
                this.loadingEmitter.next(false);
            })
        );
    }

    public delete(url: string, showToaster = false): Observable<any> {
        return this.http.delete(url).pipe(
            tap((data: any) => {
                if (showToaster) {
                    //this.toaster.showFromApiResponse(data as ApiResponse);
                }
            }),
            catchError((error: { error: { message: any }; status: any; message: any }) => {
                if (showToaster) {
                    //this.toaster.show(ToastType.ERROR, 'api.error-404');
                }
                return this.errorHandler(error);
            }),
            finalize(() => {
                this.loadingEmitter.next(false);
            })
        );
    }

    handleRedirectError(err: HttpErrorResponse) {
        if (err.status === 0) {
            // this.navigation.navigateToUnsecure();
        }
    }
}
