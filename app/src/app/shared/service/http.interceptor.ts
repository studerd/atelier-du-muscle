import {Injectable} from '@angular/core';
import {
    HTTP_INTERCEPTORS,
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import {EMPTY, Observable, of} from 'rxjs';
import {TokenService} from '@security/service';
import {ApiResponse, ApiUri} from '@shared/model';
import {catchError, switchMap} from 'rxjs/operators';
import {isNil} from 'lodash';
import {RefreshPayload} from '@security/model';
import {NavigationService} from '@shared/service/navigation.service';


/*
export class HttpInterceptorService implements HttpInterceptor {
  attemps = 0;

  constructor(public auth: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const cloneReq = this.addToken(req);
    return next.handle(cloneReq).pipe(
      catchError((err: HttpErrorResponse) => {
        return this.handleError(err, cloneReq, next)
      })
    )
  }

  private addToken(req: HttpRequest<any>): HttpRequest<any> {
    if (!req.url.includes(ApiUri.SIGNIN) && !req.url.includes(ApiUri.SIGNUP) && !req.url.includes(ApiUri.REFRESH_TOKEN)) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.tokenService.getToken()}`
        }
      });
    }
    return req;
  }

  private handleError(err: HttpErrorResponse, req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (this.attemps > 1) {
      this.attemps = 0;
      this.auth.navigation.navigateToUnsecure();
      return throwError(err);
    }
    this.attemps++;
    if (err.error.error === 'unauthorized' || err.status === 401) {
      if (isNil(this.auth.tokenService.getRefreshToken())) {
        this.auth.navigation.navigateToUnsecure();
        return throwError(err);
      } else {
        const refreshPayload: RefreshPayload = {
          token: this.auth.tokenService.getRefreshToken()!
        }
        return this.auth.refreshToken(refreshPayload).pipe(switchMap((response: ApiResponse) => {
          if (!response.result) {
            return throwError(err);
          }
          const cloneReq = this.addToken(req);
          return next.handle(cloneReq).pipe(
            catchError((err: HttpErrorResponse) => {
              return this.handleError(err, req, next)
            })
          )
        }));
      }
    }
    return throwError(err);
  }
}
*/
@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
    attemps = 0;
    token: string = '';
    refreshToken: string = '';

    constructor(public tokenService: TokenService, public navigation: NavigationService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const cloneReq = this.addToken(req);
        return next.handle(cloneReq).pipe(
            catchError((err: HttpErrorResponse) => {
                return this.handleError(err, cloneReq, next)
            })
        );
    }

    private addToken(req: HttpRequest<any>): HttpRequest<any> {
       if (!req.url.includes(ApiUri.SIGNIN) && !req.url.includes(ApiUri.SIGNUP) && !req.url.includes(ApiUri.REFRESH_TOKEN)) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.tokenService.getToken()}`
                }
            });
        }
        return req;
    }

    private handleError(err: HttpErrorResponse, req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        if (this.attemps > 1) {
            this.attemps = 0;
            this.navigation.navigateToUnsecure();
            return this.throwErrorHandle(err);
        }
        this.attemps++;
        if (err.error.error === 'unauthorized' || err.status === 401 || err.status === 403) {
            if (isNil(this.tokenService.getRefreshToken())) {
                this.navigation.navigateToUnsecure();
                return this.throwErrorHandle(err);
            } else {
                const refreshPayload: RefreshPayload = {
                    token: this.tokenService.getRefreshToken()!
                }
                return this.refreshTokenCall(refreshPayload).pipe(switchMap((response: ApiResponse) => {
                    if (!response.result) {
                        return this.throwErrorHandle(err);
                    }
                    const cloneReq = this.addToken(req);
                    return next.handle(cloneReq).pipe(
                        catchError((err: HttpErrorResponse) => {
                            return this.handleError(err, req, next)
                        })
                    )
                }));
            }
        }
        return this.throwErrorHandle(err);
    }

    private throwErrorHandle(err: HttpErrorResponse): Observable<any> {
        console.log('[HTTP INTERCEPTOR] ' + err.message);
        return of(EMPTY);
    }

    private refreshTokenCall(payload: RefreshPayload): Observable<any> {
        return of(payload);
    }
}

export const httpInterceptorProviders = [
    {provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true},
];