import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './pages/menu/menu.component';
import { CartComponent } from './pages/cart/cart.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AdminComponent } from './modules/admin/admin.component';

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent
    },
    {
        path:'menu',
        component:MenuComponent
    },
    // {
    //     path:'cart',
    //     component:CartComponent
    // },
    {
        path:'admin',
        component:AdminComponent,
    },
    {
        path:'**',
        component:NotFoundComponent
    }
];
