import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApi } from './base-api.class';
import { IUser } from '@models/user';
import { Observable, tap } from 'rxjs';

export interface LoginCredentials {
  username: string,
  password: string
}

export interface RegisterCredentials {
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


  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.post<LoginResponse>({ endpoint: 'login', body: credentials }).pipe(tap(r => {
      this.access_token = r.access_token;
      localStorage.setItem('access_token', r.access_token);
    }))
  }

  register(credentials: RegisterCredentials): Observable<IUser> {
    return this.post<IUser>({ endpoint: 'register', body: credentials }).pipe(tap(r => {
    }))
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logOut() {
    this.access_token = '';
    localStorage.removeItem('access_token');

    // A futuro cuando este implementado el profile añadir aca un cleanup
  }

  /* PRIVATES */
  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      try { return localStorage.getItem('access_token'); } 
      catch {}
    }
    return '';
  }
}
