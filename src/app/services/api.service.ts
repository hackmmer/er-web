import { Injectable } from '@angular/core';
import { UsersService } from './api/users.service';
import { AuthService } from './api/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public users: UsersService, public auth: AuthService) { }
}
