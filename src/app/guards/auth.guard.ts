import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ApiService } from '@services/api/api.service';
import { firstValueFrom } from 'rxjs';

export const authGuard: CanActivateFn = async (route, state) => {
  const api = inject(ApiService);
  const router = inject(Router);

  const loggedIn = api.auth.isLoggedIn();
  const minAccess = route.data['minAccessLevel'];

  if (loggedIn) {
    if (minAccess) {
      const loggedUser = await firstValueFrom(
        await api.users.getCurrentUser(),
        {
          defaultValue: null,
        }
      );
      if (loggedUser) return loggedUser.role > minAccess;
      return false
    }
    return true
  }

  router.navigate(['']);
  return false;
};
