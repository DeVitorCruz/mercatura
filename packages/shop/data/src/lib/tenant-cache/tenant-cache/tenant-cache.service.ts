import { Service, signal, WritableSignal } from '@angular/core';

@Service()
export class TenantCacheService {
    private readonly _checked: WritableSignal<boolean> =
        signal<boolean>(false);
    private readonly _valid: WritableSignal<boolean> =
        signal<boolean>(false);

    public get checked(): boolean { return this._checked(); }
    public get valid(): boolean { return this._valid(); }

    public setValid(): void {
        this._checked.set(true);
        this._valid.set(true);
    }

    public setInvalid(): void {
        this._checked.set(true);
        this._valid.set(false);
    }

    public reset(): void {
        this._checked.set(false);
        this._valid.set(false);
    }
}
