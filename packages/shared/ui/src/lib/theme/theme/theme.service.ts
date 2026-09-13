import { Service, signal, WritableSignal, PLATFORM_ID, inject, Signal, computed } from '@angular/core';
import { ThemeMode } from '@mercatura/models';
import { isPlatformBrowser } from '@angular/common';

@Service()
export class ThemeService {
    private readonly isBrowser: boolean = isPlatformBrowser(inject(PLATFORM_ID));
    
    private readonly STORAGE_KEY: string = 'mercatura-platform-theme';
    private readonly ATTRIBUTE: string = 'data-theme';

    public readonly theme: WritableSignal<ThemeMode> = signal<ThemeMode>(this._loadTheme());
    public readonly isDark: Signal<boolean> = computed<boolean>(() => this.theme() === 'dark');

    public setTheme(theme: ThemeMode): void {
        this.theme.set(theme);
        this._applyTheme(theme);
        if (this.isBrowser) {
            localStorage.setItem(this.STORAGE_KEY, theme);
        }
    }

    public toggle(): void {
        this.setTheme(this.isDark() ? 'light' : 'dark');   
    }

    private _loadTheme(): ThemeMode {
        if (!this.isBrowser) return 'light';
        const STORED: ThemeMode = localStorage.getItem(this.STORAGE_KEY) as ThemeMode;
        if (STORED) return STORED;
        return window.matchMedia('(prefers-color-scheme: dark)').matches 
            ? 'dark' 
            : 'light';
    }

    private _applyTheme(theme: ThemeMode): void {
        if (!this.isBrowser) return;
        document.documentElement.setAttribute(this.ATTRIBUTE, theme);
    }
}
