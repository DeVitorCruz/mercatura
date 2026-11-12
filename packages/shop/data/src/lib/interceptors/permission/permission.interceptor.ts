import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { catchError, throwError } from 'rxjs';


export const permissionInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const auth = inject(AuthService);
  
  return next(req).pipe(
    catchError(err => {
      if(err.status === 401) {
        auth.logout().subscribe();
        router.navigate(['/auth/login']);
      }
      if (err.status === 403) {
        router.navigate(['/403']);
      }
      return throwError(() => err);
    })
  );
};
