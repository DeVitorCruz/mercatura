import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: '',
        redirectTo: 'auth/login',
        pathMatch: 'full',
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('@mercatura/shop/feature-auth').then(m => m.authRoutes),
    },
    {
        path: '**',
        redirectTo: 'auth/login',
    }
];
