import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../../environments/environment";

interface ApiOptions {
    endpoint?: string,
    headers?: HttpHeaders | Record<string, string | string[]>,
    params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
    body?: any | null;
}

export abstract class BaseApi {
    readonly baseUrl = environment.api.url
    readonly fullUrl: string;

    constructor(private http: HttpClient, protected endpoint = '') {
        this.fullUrl = `${this.baseUrl}/${endpoint}`
    }

    get<T>(options: ApiOptions) {
        return this.http.get<T>(`${this.fullUrl}/${options.endpoint ?? ''}`, {
            headers: options?.headers,
            params: options?.params,
        })
    }

    post<T>(options: ApiOptions) {
        return this.http.post<T>(`${this.fullUrl}/${options.endpoint ?? ''}`, options.body, {
            headers: options?.headers,
            params: options?.params
        })
    }
}