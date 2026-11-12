import { computed, inject, Service, signal, } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ApiService } from '../api/api.service';
import { StorageService } from '../storage/storage.service';
import {
    AuthResponse,
    AuthUser,
    LoginRequest,
    RegisterRequest,
} from '@mercatura/models';
import { PermissionService } from '../permission/permission.service';

@Service()
export class AuthService extends ApiService {
    readonly storage = inject(StorageService);
    readonly permissions = inject(PermissionService);

    private readonly TOKEN_KEY: string = 'auth_token';
    private readonly USER_KEY: string = 'auth_user';

    private readonly _token = signal<string | null>(null);
    private readonly _user = signal<AuthUser | null>(null);

    readonly token = computed<string | null>(() => this._token());
    readonly user = computed<AuthUser | null>(() => this._user());
    readonly isAuthenticated = computed<boolean>(() => !!this._token());

    constructor() {
        super();
        this._loadFromStorage();
    }

    login(credentials: LoginRequest, router?: string): Observable<AuthResponse> {
        let path: string = router ?? 'login';
        return this.post<AuthResponse>(path, credentials).pipe(
            tap(response => this._setSession(response))
        );   
    }

    register(data: RegisterRequest, router?: string): Observable<AuthResponse> {
        let path: string = router ?? 'register';
        return this.post<AuthResponse>(path, data).pipe(
            tap(response => this._setSession(response))
        );
    }

    logout(router?: string): Observable<{ message: string }> {
        let path: string = router ?? 'logout';
        return this.post<{ message: string }>(path, {}).pipe(
            tap(() => this._clearSession())
        );
    }

    getToken(): string | null {
        return this._token();
    }

    loadProfile(router?: string): Observable<AuthUser> {
        let path: string = router ?? 'me';
        return this.get<AuthUser>(path).pipe(
            tap(user => {
                this._user.set(user);
                this.storage.setItem(this.USER_KEY, JSON.stringify(user));
                this.permissions.set(user.permissions, user.roles);
            })
        );
    }

    private _setSession(response: AuthResponse): void {
        this._token.set(response.access_token);
        this._user.set(response.user);
        this.storage.setItem(this.TOKEN_KEY, response.access_token);
        this.storage.setItem(this.USER_KEY, JSON.stringify(response.user));
        this.permissions.set(response.user.permissions, response.user.roles);
    }

    private _clearSession(): void {
        this._token.set(null);
        this._user.set(null);
        this.storage.removeItem(this.TOKEN_KEY);
        this.storage.removeItem(this.USER_KEY);
        this.permissions.clear();
    }

    private _loadFromStorage(): void {
        const TOKEN: string = this.storage.getItem(this.TOKEN_KEY)!;
        const USER: string = this.storage.getItem(this.USER_KEY)!;
        if (TOKEN) this._token.set(TOKEN);
        if (USER) {
            const AUTH_USER: AuthUser = JSON.parse(USER);
            this._user.set(AUTH_USER);
            this.permissions.set(AUTH_USER.permissions, AUTH_USER.roles);
        };
    }
}
