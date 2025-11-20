import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { inject } from '@angular/core';

function isJwtExpired(token: string): boolean {
  try {
    const [, payload] = token.split('.');
    const { exp } = JSON.parse(atob(payload));
    return typeof exp === 'number' ? Date.now() / 1000 >= exp : false;
  } catch {
    return true;
  }
}

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const token = auth.getToken();

  if (auth.isAuthenticated() && token && !isJwtExpired(token)) {
    return true;
  }

  router.navigate(['']);
  return false;
};
