import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApi } from './base-api.class';
import { IUser } from '@models/user';
import { AuthService } from './auth.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends BaseApi {
  public currentUser?: IUser;
  headers?: HttpHeaders;

  token?:string | null;

  constructor(http: HttpClient, private authService: AuthService) {
    super(http, 'users');
  }

  updateHeaders() {
    this.token = this.authService.getToken()
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
  }

  getCurrentUser() {
    this.updateHeaders();
    return this.get<IUser>({
      headers: this.headers,
    }).pipe(
      tap((user) => {
        this.currentUser = user;
      })
    );
  }
}
