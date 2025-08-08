import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApi } from './base-api.class';
import { IUser } from '@models/user';
import { Observable, tap } from 'rxjs';
import { LocalStorageService } from '@services/local-storage.service';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  user: IUser;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseApi {
  // CONSTS
  private readonly access_token_key = 'access_token';

  constructor(http: HttpClient, private localStorage: LocalStorageService) {
    super(http, 'auth');
  }

  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.post<LoginResponse>({
      endpoint: 'login',
      body: credentials,
    }).pipe(
      tap((r) => {
        this.localStorage.set(this.access_token_key, r.access_token);
      })
    );
  }

  register(credentials: RegisterCredentials): Observable<IUser> {
    return this.post<IUser>({ endpoint: 'register', body: credentials }).pipe(
      tap((r) => {})
    );
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  public getToken() {
    return this.localStorage.get(this.access_token_key);
  }
}
