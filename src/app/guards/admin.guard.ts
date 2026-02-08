import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const adminGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAllowed = await authService.ensureSession();
  if (isAllowed) {
    return true;
  }

  router.navigateByUrl('/admin/login');
  return false;
};
