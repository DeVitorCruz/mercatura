import { Route } from '@angular/router';

export const authRoutes: Route[] = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    } as Route,
    {
        path: 'login',
        loadComponent: () => 
            import('./login/login.component').then(m => m.LoginComponent)
    } as Route,
    {
        path: 'register',
        loadComponent: () => 
            import('./register/register.component').then(m => m.RegisterComponent)
    } as Route,
] as Route[];