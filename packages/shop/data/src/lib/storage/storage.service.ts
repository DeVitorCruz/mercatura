import { inject, PLATFORM_ID, Service } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Service()
export class StorageService {
    private readonly isBrowser: boolean = isPlatformBrowser(inject(PLATFORM_ID));

    public setItem(key: string, value: string): void {
        if (this.isBrowser) localStorage.setItem(key, value);
    }

    public getItem(key: string): string | null {
        if (this.isBrowser) return localStorage.getItem(key);
        return null;
    }

    public removeItem(key: string): void {
        if (this.isBrowser) localStorage.removeItem(key);
    }

    public clear(): void {
        if (this.isBrowser) localStorage.clear();
    }
}
