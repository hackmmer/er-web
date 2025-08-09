import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './pages/menu/menu.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AdminComponent } from './modules/admin/admin.component';
import { AuthGuard } from '@services/auth.guard.service';

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
        path:'admin',
        component:AdminComponent,
        canActivate:[AuthGuard]
    },
    {
        path:'**',
        component:NotFoundComponent
    }
];
