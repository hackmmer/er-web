import { Observable, tap } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
  HttpStatusCode,
} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { inject } from '@angular/core';
import { NotificationsService } from '@services/notifications.service';

interface ApiOptions {
  endpoint?: string;
  headers?: HttpHeaders | Record<string, string | string[]>;
  params?: HttpParams | Record<string, any>;
  body?: any | null;
}

interface IApiError {
  error: string;
  message: string[];
  statusCode: number;
}

export interface CRUD<T> {
  create?(data: T): Observable<T | any>;
  findAll?(): Observable<(T | any)[] | any>;
  findOne?(id: string): Observable<T | any>;
  update?(id: string, data: T): Observable<T | any>;
  remove?(id: string): Observable<T | any>;
}

export abstract class BaseApi {
  readonly baseUrl = environment.api.url;
  readonly fullUrl: string;

  private notifications: NotificationsService = inject(NotificationsService);

  constructor(private http: HttpClient,  protected endpoint = '') {
    this.fullUrl = `${this.baseUrl}/${endpoint}`;
  }

  get<T = any>(options?: ApiOptions) {
    return this.http
      .get<T>(`${this.fullUrl}/${options?.endpoint ?? ''}`, {
        params: options?.params,
      })
      .pipe(
        tap({
          error: (e) => this._handleError(e),
        })
      );
  }

  post<T = any>(options?: ApiOptions) {
    return this.http
      .post<T>(
        `${this.fullUrl}/${options?.endpoint ?? ''}`,
        options?.body ?? '',
        {
          params: options?.params,
        }
      )
      .pipe(
        tap({
          error: (e) => this._handleError(e),
        })
      );
  }

  delete<T = any>(options?: ApiOptions) {
    return this.http
      .delete<T>(`${this.fullUrl}/${options?.endpoint ?? ''}`)
      .pipe(
        tap({
          error: (e) => this._handleError(e),
        })
      );
  }

  patch<T = any>(options?: ApiOptions) {
    return this.http
      .patch<T>(
        `${this.fullUrl}/${options?.endpoint ?? ''}`,
        options?.body ?? '',
        {
          params: options?.params,
        }
      )
      .pipe(
        tap({
          error: (e) => this._handleError(e),
        })
      );
  }

  private _handleError(err: HttpErrorResponse) {
    if (err.status !== HttpStatusCode.BadRequest) {
      console.error(err);
      return;
    }
    const serverErr: IApiError = err.error;
    serverErr.message.forEach((m) => {
      this.notifications.createNotification(m, 'error');
    });
  }
}
