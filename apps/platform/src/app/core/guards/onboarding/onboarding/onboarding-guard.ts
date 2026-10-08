import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@mercatura/shop/data';
import { TenantCacheService } from '@mercatura/shop/data';

export const onboardingGuard: CanActivateFn = () => {
  const AUTH: AuthService = inject(AuthService);
  const ROUTER: Router = inject(Router);
  const CACHE: TenantCacheService = 
    inject(TenantCacheService);

  // 1. No token -> login
  if (!AUTH.getToken()) {
    return ROUTER.createUrlTree(['/auth/login']);
  }

  // Cache says tenant is valid + has app -> dashboard
  if(CACHE.checked && CACHE.valid) {
    return ROUTER.createUrlTree(['/dashboard']);
  }

  // Cache says checked but invalid (no tenant/app) -> allow onboarding
  // OR cache not checked yet -> allow onboarding
  return true;
};
