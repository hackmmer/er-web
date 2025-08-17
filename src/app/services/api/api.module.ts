import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './api.service';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { ProductsService } from './products.service';
import { CustomProductsService } from './custom-products.service';

@NgModule({
  declarations: [],
  providers: [ApiService, UsersService, AuthService, ProductsService, CustomProductsService],
  imports: [CommonModule],
})
export class ApiModule {}
