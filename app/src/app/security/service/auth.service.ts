import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {ApiResponse, ApiUri, emptyApiResponse} from '@shared/model';
import {TokenService} from '@security/service/token.service';
import {ApiService, HttpService, NavigationService} from '@shared/service';
import {map, switchMap, tap} from 'rxjs/operators';
import {RefreshPayload} from '@security/model/payload/refresh.payload';
import {Credential, CredentialDto, SigninPayload, SignupPayload} from '@security/model';
import {SigninResponse} from '@security/model/response/signin.response';
import {SignupResponse} from '@security/model/response/signup.response';
import {isNil} from 'lodash';
import {TokenResponse} from '@security/model/response/token.response';
import {CredentialHelper} from '@security/helper';

@Injectable({
    providedIn: 'root'
})
export class AuthService extends ApiService {
    isAuthenticated$ = new BehaviorSubject<boolean>(false);
    iInitialized = false;
    account$: BehaviorSubject<Credential> = new BehaviorSubject<Credential>(CredentialHelper.getEmpty());

    constructor(public tokenService: TokenService, public override http: HttpService, public navigation: NavigationService) {
        super(http);
        this.init();
    }


    public init(): void {
        const isAuthenticated = this.isAuthenticated$.getValue();
        of(isAuthenticated).pipe(
            switchMap((isAuthenticated: boolean) => {
                const refreshToken = this.tokenService.getRefreshToken();
                this.iInitialized = true;
                if (isAuthenticated) {
                    this.navigation.navigateToSecure();
                    return this.refreshToken({token: refreshToken!});
                } else {
                    if (isNil(refreshToken)) {
                        return of(emptyApiResponse);
                    } else {
                        return this.refreshToken({token: refreshToken});
                    }
                }
            }),
            switchMap((response: ApiResponse) => {
                if (response.result) {
                    return this.me();
                }
                return of(response);
            })).subscribe((data: ApiResponse) => {
            if (data.result) {
                this.navigation.navigateToSecure();
            } else {
                this.isAuthenticated$.next(false);
                this.navigation.navigateToUnsecure();
            }
        });

    }

    signin(payload: SigninPayload): Observable<ApiResponse> {
        return this.post(ApiUri.SIGNIN, payload).pipe(
            map((response: ApiResponse) => {
                if (response.result) {
                    const signinResponse: SigninResponse = response.data as SigninResponse;
                    this.tokenService.saveToken(signinResponse.token);
                    this.tokenService.saveRefreshToken(signinResponse.refreshToken);
                    this.isAuthenticated$.next(true);
                    this.navigation.navigateToSecure();
                }
                return response;
            })
        )
    }

    me(): Observable<ApiResponse> {
        return this.get(ApiUri.ME).pipe(tap((response: ApiResponse) => {
            this.account$.next(CredentialHelper.credentialFromDto(response.data as CredentialDto))
        }))
    }

    signup(payload: SignupPayload): Observable<ApiResponse> {
        return this.post(ApiUri.SIGNUP, payload).pipe(
            map((response: ApiResponse) => {
                if (response.result) {
                    const signinResponse: SignupResponse = response.data as SignupResponse;
                    this.tokenService.saveToken(signinResponse.token);
                    this.tokenService.saveRefreshToken(signinResponse.refreshToken);
                    this.isAuthenticated$.next(true);
                    this.navigation.navigateToSecure();
                }
                return response;
            })
        )
    }

    refreshToken(refresh: RefreshPayload): Observable<ApiResponse> {
        return this.post(ApiUri.REFRESH_TOKEN, refresh).pipe(
            map((response: ApiResponse) => {
                if (response.result) {
                    const tokenResponse: TokenResponse = response.data as TokenResponse;
                    this.tokenService.saveToken(tokenResponse.token);
                    this.tokenService.saveRefreshToken(tokenResponse.refreshToken);
                    this.isAuthenticated$.next(true);
                }
                return response;
            })
        )
    }

    logout(): void {
        this.tokenService.signOut();
        this.isAuthenticated$.next(false);
        this.navigation.navigateToUnsecure();
    }
}
