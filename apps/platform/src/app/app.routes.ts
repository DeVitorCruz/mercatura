import { Route } from '@angular/router';
import { AUTH_PLATFORM_ROUTES } from './features/auth/auth.platform.routes';

export const appRoutes: Route[] = [
    {
        path: '',
        redirectTo: 'auth/login',
        pathMatch: 'full',
    },
    {
        path: 'auth',
        children: AUTH_PLATFORM_ROUTES,
    },
    {
        path: '**',
        redirectTo: 'auth/login',
    }
];
