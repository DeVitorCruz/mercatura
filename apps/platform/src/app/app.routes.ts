import { Route } from '@angular/router';
import { authPlatformRoutes } from './features/auth/auth.platform.routes';
import { platformBuildRoutes } from './features/platform-build/platform-build.routes';
import { authGuard } from './core/guards/auth/auth/auth-guard';
import { onboardingGuard } from './core/guards/onboarding/onboarding/onboarding-guard';

export const appRoutes: Route[] = [
    {
        path: 'auth',
        children: authPlatformRoutes,
    },
    {
        path: '',
        canActivate: [authGuard],
        children: platformBuildRoutes,
    },
    {
        path: 'onboarding',
        canActivate: [onboardingGuard],
        loadChildren: () =>
            import('./features/pages/onboarding/onboarding.routes')
                .then(m => m.onboardingRoutes),
    },
    {
        path: '**',
        redirectTo: 'auth/login',
    }
];
