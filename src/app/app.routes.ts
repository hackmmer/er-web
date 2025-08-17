import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './pages/menu/menu.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AdminComponent } from './modules/admin/admin.component';
import { AuthGuard } from '@services/auth.guard.service';
import { ProfileComponent } from './pages/profile/profile.component';
import { CustomProductComponent } from './pages/custom-product/custom-product.component';

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent
    },
    {
        path:'menu',
        component:MenuComponent
    },
    {
        path:'profile',
        component:ProfileComponent,
        canActivate:[AuthGuard]
    },
    {
        path:'admin',
        component:AdminComponent,
        canActivate:[AuthGuard]
    },
    {
        path:'custom',
        component:CustomProductComponent,
        canActivate:[AuthGuard]
    },
    {
        path:'**',
        component:NotFoundComponent
    },
];
