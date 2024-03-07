import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TokenService {
    private tokenKey = 'token_boilerplate';
    private refreshTokenKey = 'refresh_token_boilerplate';
    private localStorage = window.localStorage;

    constructor() {
    }

    signOut(): void {
        this.localStorage.clear();
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
