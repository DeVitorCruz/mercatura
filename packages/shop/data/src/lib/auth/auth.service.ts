import { computed, inject, Service, Signal, signal, WritableSignal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ApiService } from '../api/api.service';
import { StorageService } from '../storage/storage.service';
import {
    AuthResponse,
    AuthUser,
    LoginRequest,
    RegisterRequest,
} from '@mercatura/models';

@Service()
export class AuthService extends ApiService {
    private readonly STORAGE: StorageService = inject(StorageService);

    private readonly TOKEN_KEY: string = 'auth_token';
    private readonly USER_KEY: string = 'auth_user';

    private readonly TOKEN: WritableSignal<string | null> = signal<string | null>(null);
    private readonly USER: WritableSignal<AuthUser | null> = signal<AuthUser | null>(null);

    public readonly token: Signal<string | null> = computed(() => this.TOKEN());
    public readonly user: Signal<AuthUser | null> = computed(() => this.USER());
    public readonly isAuthenticated: Signal<boolean> = computed(() => !!this.TOKEN());

    constructor() {
        super();
        this._loadFromStorage();
    }

    public login(credentials: LoginRequest): Observable<AuthResponse> {
        return this.post<AuthResponse>('login', credentials).pipe(
            tap(response => this._setSession(response))
        );   
    }

    public register(data: RegisterRequest): Observable<AuthResponse> {
        return this.post<AuthResponse>('register', data).pipe(
            tap(response => this._setSession(response))
        );
    }

    public logout(): Observable<{ message: string }> {
        return this.post<{ message: string }>('logout', {}).pipe(
            tap(() => this._clearSession())
        );
    }

    private _setSession(response: AuthResponse): void {
        this.TOKEN.set(response.access_token);
        this.USER.set(response.user);
        this.STORAGE.setItem(this.TOKEN_KEY, response.access_token);
        this.STORAGE.setItem(this.USER_KEY, JSON.stringify(response.user));
    }

    private _clearSession(): void {
        this.TOKEN.set(null);
        this.USER.set(null);
        this.STORAGE.removeItem(this.TOKEN_KEY);
        this.STORAGE.removeItem(this.USER_KEY);
    }

    private _loadFromStorage(): void {
        const TOKEN: string = this.STORAGE.getItem(this.TOKEN_KEY)!;
        const USER: string = this.STORAGE.getItem(this.USER_KEY)!;
        if (TOKEN) this.TOKEN.set(TOKEN);
        if (USER) this.USER.set(JSON.parse(USER));
    }

    public getToken(): string | null {
        return this.TOKEN();
    }
}
