import { computed, Service, Signal, signal, WritableSignal } from '@angular/core';
import { ProfileResponse, UpdateProfileRequest } from '@mercatura/models';

@Service()
export class ProfileStateService {
    private readonly _data: WritableSignal<ProfileResponse | null> =
        signal<ProfileResponse | null>(null);
    private readonly _saving: WritableSignal<boolean> =
        signal<boolean>(false);
    private readonly _success: WritableSignal<boolean> =
        signal<boolean>(false);
    private readonly _error: WritableSignal<string | null> =
        signal<string | null>(null); 

    // ---- Public readonly signals ------------------------
    public readonly data: Signal<ProfileResponse | null> =
        computed<ProfileResponse | null>(() => this._data());
    public readonly saving: Signal<boolean> = 
        computed<boolean>(() => this._saving());
    public readonly success: Signal<boolean> = 
        computed<boolean>(() => this._success());
    public readonly error: Signal<string | null> =
        computed<string | null>(() => this._error()); 

    // ---- Save callback - set by layout ------------------------
    private _saveFn?: (playload: UpdateProfileRequest) => void;

    public setData(data: ProfileResponse): void {
        this._data.set(data);
    }

    public setSaving(value: boolean): void {
        this._saving.set(value);
    }

    public setSuccess(value: boolean): void {
        this._success.set(value);
    }

    public setError(value: string | null): void {
        this._error.set(value);
    }

    public registerSaveFn(fn: (playload: UpdateProfileRequest) => void): void {
        this._saveFn = fn;
    }

    public save(playload: UpdateProfileRequest): void {
        this._saveFn?.(playload);
    }
}
