import { Route } from "@angular/router";
import { PlatformShellConfig } from "../platform-shell.interface";
import { HEADER } from "../HEADER"; 

export function buildPlatformShellRoutes(
    config: PlatformShellConfig,
    children: Route[] = []
): Route[] {
    return [{
        path: '',
        loadComponent: () =>
            import('./layout/platform-shell.layout')
            .then(m => m.PlatformShellLayout),
        data: {
            navItems: config.navItems,
            brandName: config.brandName ?? 'Mercatura',
            brandLogo: config.brandLogo ?? '',
            headerConfig: config.headerConfig,
        },
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full',
            },
            ...children,
        ]
    }];
}