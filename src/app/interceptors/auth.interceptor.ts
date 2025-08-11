import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@services/api/auth.service';
import { LocalStorageService } from '@services/local-storage.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const localStorage = inject(LocalStorageService);
  const authService = inject(AuthService);
  const token = localStorage.get(authService.access_token_key);

  // Clonar la request solo si tenemos token
  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(authReq);
  }

  return next(req);
};
