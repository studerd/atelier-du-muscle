import {Injectable} from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot,CanActivate } from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '@security/service/auth.service';
import {isNil} from 'lodash';
import {RefreshPayload} from '@security/model/payload/refresh.payload';
import {ApiResponse} from '@shared/model';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SecurityGuard  implements CanActivate{
    constructor(private auth: AuthService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        // if already logged --------------------------
        if (this.auth.isAuthenticated$.getValue()) {
            return true;
        }
        // else if no token available -----------------
        if (isNil(this.auth.tokenService.getRefreshToken())) {
            this.auth.navigation.navigateToUnsecure();
            return false;
        } else {
            const refreshPayload: RefreshPayload = {
                token: this.auth.tokenService.getRefreshToken()!
            }
            // So , we are not logged but still have a token in local storage
            // we'll try to retrieve user or refresh token if expired
            return this.auth.refreshToken(refreshPayload).pipe(map((response: ApiResponse) => {
                if (!response.result) {
                    this.auth.navigation.navigateToUnsecure();
                }
                return response.result;
            }));
        }
    }

}
