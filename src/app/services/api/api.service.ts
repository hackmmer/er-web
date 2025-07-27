import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    public users: UsersService,
    public auth: AuthService,
    public products: ProductsService
  ) {}
}
