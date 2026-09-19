import { Route } from '@angular/router';
import { authPlatformRoutes } from './features/auth/auth.platform.routes';
import { platformBuildRoutes } from './features/platform-build/platform-build.routes';

export const appRoutes: Route[] = [
    {
        path: '',
        redirectTo: 'auth/login',
        pathMatch: 'full',
    },
    {
        path: 'auth',
        children: authPlatformRoutes,
    },
    {
        path: '',
        children: platformBuildRoutes,
    },
    {
        path: '**',
        redirectTo: 'auth/login',
    }
];
