import { Injectable } from "@angular/core";
import { BaseApi, CRUD } from "./base-api.class";
import { ICustomProduct, ICustomProductCreate } from "@models/product";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root',
})
export class CustomProductsService extends BaseApi implements CRUD<ICustomProduct>{
    constructor(http:HttpClient){
        super(http, 'products/custom');
    }

    create_product(data: ICustomProductCreate): Observable<ICustomProductCreate> {
        return this.post<ICustomProductCreate>({ 
            body: data
        });
    }

    findAll(): Observable<(ICustomProduct | any)[] | any> {
        return this.get<ICustomProduct[]>()
    }
}