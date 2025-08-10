import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

interface ApiOptions {
  endpoint?: string;
  headers?: HttpHeaders | Record<string, string | string[]>;
  params?: HttpParams | Record<string, any>;
  body?: any | null;
}

export interface CRUD<T> {
  create?(data: T): Observable<T | any>;
  findAll?(): Observable<(T | any)[] | any>;
  findOne?(id: string): Observable<T | any>;
  update?(id: string, data: T): Observable<T | any>;
  remove?(id: string): Observable<T | any>;
}

export abstract class BaseApi{
  readonly baseUrl = environment.api.url;
  readonly fullUrl: string;

  constructor(private http: HttpClient, protected endpoint = '') {
    this.fullUrl = `${this.baseUrl}/${endpoint}`;
  }

  get<T = any>(options?: ApiOptions) {
    return this.http.get<T>(`${this.fullUrl}/${options?.endpoint ?? ''}`, {
      headers: options?.headers,
      params: options?.params,
    });
  }

  post<T = any>(options?: ApiOptions) {
    return this.http.post<T>(
      `${this.fullUrl}/${options?.endpoint ?? ''}`,
      options?.body ?? '',
      {
        headers: options?.headers,
        params: options?.params,
      }
    );
  }

  patch<T = any>(options?: ApiOptions) {
    return this.http.patch<T>(`${this.fullUrl}/${options?.endpoint ?? ''}`,
      options?.body ?? '',
      {
        headers: options?.headers,
        params: options?.params
      }
    );
  }
}
