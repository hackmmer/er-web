import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApi } from './base-api.class';
import { IUser } from '@models/user';
import { tap } from 'rxjs';

interface LoginCredentials {
  username: string,
  password: string
}

interface RegisterCredentials {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
}

interface LoginResponse {
  access_token: string;
  user: IUser;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseApi {

  public access_token = "";

  constructor(http: HttpClient) {
    super(http, 'auth');
  }


  login(credentials: LoginCredentials) {
    this.post<LoginResponse>({ endpoint: 'login', body: credentials }).pipe(tap(r => {
      this.access_token = r.access_token;
    }))
  }

  register(credentials: RegisterCredentials) {
    this.post<IUser>({ endpoint: 'register', body: credentials }).pipe(tap(r => {
    }))
  }

}
