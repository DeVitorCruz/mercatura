import { Route } from "@angular/router";
import { PlatformShellConfig } from "../platform-shell.interface";
import { HeaderConfig } from "./header/header.interface";
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
            headerConfig: config.headerConfig ?? HEADER as HeaderConfig,
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