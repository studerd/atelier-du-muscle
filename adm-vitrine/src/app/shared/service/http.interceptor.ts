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
    if (!req.url.includes(ApiUri.SIGNIN)
      && !req.url.includes(ApiUri.SIGNUP)
      && !req.url.includes(ApiUri.REFRESH_TOKEN)
      && !req.url.includes(ApiUri.PRODUCT_LIST)
      && !req.url.includes(ApiUri.ORDER_MAIL)
      && !req.url.includes(ApiUri.PRODUCT_DETAIL)) {
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
    return of(EMPTY);
  }

  private refreshTokenCall(payload: RefreshPayload): Observable<any> {
    return of(payload);
  }
}

export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true},
];
