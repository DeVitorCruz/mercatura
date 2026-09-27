import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@mercatura/shop/data';
import { PlatformService } from '@mercatura/shop/data';
import { catchError, map, of } from 'rxjs';

export const onboardingGuard: CanActivateFn = () => {
  const AUTH: AuthService = inject(AuthService);
  const PLATFORM: PlatformService = inject(PlatformService);
  const ROUTER: Router = inject(Router);

  // 1. No token -> login
  if (!AUTH.getToken()) {
    return ROUTER.createUrlTree(['/auth/login']);
  }

  // 2. Already has tenant + app -> dahsboard
  return PLATFORM.getTenant().pipe(
    map(tenant => {
      if (tenant.apps && tenant.apps.length > 0) {
        return ROUTER.createUrlTree(['/dashboard']);
      }
      return true;
    }),
    catchError(err => {
      // 404 -> not tenant -> allow onboarding
      if (err.status === 404) return of(true);
      return of(ROUTER.createUrlTree(['/auth/login']));
    }),
  );
};
