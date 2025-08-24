import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './pages/menu/menu.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AdminComponent } from './modules/admin/admin.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CustomProductComponent } from './pages/custom-product/custom-product.component';
import { SearchComponent } from '@components/search/search.component';
import { authGuard } from './guards/auth.guard';
import { EnumRoleUser } from '@models/user';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'menu',
    component: MenuComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard],
    data: {
      minAccessLevel: EnumRoleUser.STAFF,
    },
  },
  {
    path: 'custom',
    component: CustomProductComponent,
    canActivate: [authGuard],
  },
  {
    path: 'search',
    component: SearchComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
