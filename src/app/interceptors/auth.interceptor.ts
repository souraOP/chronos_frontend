import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { environment } from '../../environment/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const token = auth.getToken();

  const isLogin =
    req.url.startsWith(`${environment.BASE_URL}/api/login/employee`) ||
    req.url.startsWith(`${environment.BASE_URL}/api/login/manager`);

  if (token && !isLogin && req.url.startsWith(environment.BASE_URL)) {
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
    return next(authReq);
  }
  return next(req);
};
