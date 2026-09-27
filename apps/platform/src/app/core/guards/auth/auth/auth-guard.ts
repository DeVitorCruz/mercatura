import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@mercatura/shop/data';
import { PlatformService } from '@mercatura/shop/data';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = () => {
    const AUTH: AuthService = inject(AuthService);
    const PLATFORM: PlatformService = inject(PlatformService);
    const ROUTER: Router = inject(Router);

    // 1. Not token -> login
    if (!AUTH.getToken()) {
        return ROUTER.createUrlTree(['/auth/login']);
    }

    // 2. Check tenant
    return PLATFORM.getTenant().pipe(
        map(tenant => {
            // suspended or cancelled -> blocked
            if (tenant.status === 'suspended' || 
                tenant.status === 'cancelled') {
                return ROUTER.createUrlTree(['/auth/login']);
            }

            // no apps -> onboarding step 2
            if (!tenant.apps || tenant.apps.length === 0) {
                return ROUTER.createUrlTree(['/onboarding']);
            }

            return true;
        }),
        catchError(err => {
            // 404 -> no tenant -> onboarding
            if (err.status === 404) {
                return of(ROUTER.createUrlTree(['/onboarding']));
            }
            // other error -> login
            return of(ROUTER.createUrlTree(['/auth/login'])); 
        }),
    );
};
