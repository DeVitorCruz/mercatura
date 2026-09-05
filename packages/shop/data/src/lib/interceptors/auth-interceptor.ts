import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const AUTH: AuthService = inject(AuthService);
  const TOKEN: string = AUTH.getToken()!;

  const headers: Record<string, string> = {
    'Accept': 'application/json',
    'Content-type': 'application/json',
  };

  if (TOKEN) {
    headers['Authorization'] = `Bearer ${TOKEN}`;
  }

  return next(req.clone({ setHeaders: headers }));
};
