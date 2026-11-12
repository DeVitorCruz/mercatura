import { CanActivateFn } from '@angular/router';
import { PermissionService } from '../../permission/permission.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const permissionGuard: CanActivateFn = (route) => {
  const ps = inject(PermissionService);
  const router = inject(Router);  

  const PERMISSIONS: string[] = route.data['permissions'];
  const REDIRECT_TO: string = route.data['redirectTo'];

  return ps.canAny(...PERMISSIONS) || router.createUrlTree([REDIRECT_TO]);
};
