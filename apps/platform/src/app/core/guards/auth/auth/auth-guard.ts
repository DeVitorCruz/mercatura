import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@mercatura/shop/data';
import { PlatformService } from '@mercatura/shop/data';
import { catchError, map, of } from 'rxjs';
import { TenantCacheService } from '@mercatura/shop/data';

export const authGuard: CanActivateFn = () => {
    const AUTH: AuthService = inject(AuthService);
    const PLATFORM: PlatformService = inject(PlatformService);
    const ROUTER: Router = inject(Router);
    const CACHE: TenantCacheService = inject(TenantCacheService);

    // 1. Not token -> login
    if (!AUTH.getToken()) {
        CACHE.reset();
        return ROUTER.createUrlTree(['/auth/login']);
    }

    if (CACHE.checked && CACHE.valid) {
        return true;
    }

    // 2. Check tenant
    return PLATFORM.getTenant().pipe(
        map(tenant => {
            // suspended or cancelled -> blocked
            if (tenant.status === 'suspended' || 
                tenant.status === 'cancelled') {
                CACHE.reset();
                return ROUTER.createUrlTree(['/auth/login']);
            }

            // no apps -> onboarding step 2
            if (!tenant.apps || tenant.apps.length === 0) {
                // <- set checked but invalid so onboardingGuard
                // doesn't call getTenant again
                CACHE.setInvalid();
                return ROUTER.createUrlTree(['/onboarding']);
            }

            CACHE.setValid();
            return true;
        }),
        catchError(err => {
            // 404 -> no tenant -> onboarding
            if (err.status === 404) {
                CACHE.reset();
                return of(ROUTER.createUrlTree(['/onboarding']));
            }
            
            if (err.status === 401) {
                CACHE.reset();
                return of(ROUTER.createUrlTree(['/auth/login'])); 
            }
            // network/server error -> allow through, don't kick user
            CACHE.setValid();
            return of(true);
        }),
    );
};
