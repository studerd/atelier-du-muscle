import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TokenService {
    private tokenKey = 'adm_shop_token';
    private refreshTokenKey = 'adm_shop_refresh_token';
    private localStorage = window.localStorage;

    constructor() {
    }

    signOut(): void {
      this.localStorage.removeItem(this.tokenKey);
    }

    public saveToken(token: string): void {
        this.localStorage.removeItem(this.tokenKey);
        this.localStorage.setItem(this.tokenKey, token);
    }

    public getToken(): string | null {
        return this.localStorage.getItem(this.tokenKey);
    }

    public saveRefreshToken(token: string): void {
        this.localStorage.removeItem(this.refreshTokenKey);
        this.localStorage.setItem(this.refreshTokenKey, token);
    }

    public getRefreshToken(): string | null {
        return this.localStorage.getItem(this.refreshTokenKey);
    }
}
