import { Injectable } from "@angular/core";
import { BaseApi, CRUD } from "./base-api.class";
import { IIngredient } from "@models/product";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class IngredientsService extends BaseApi implements CRUD<IIngredient>{
    constructor(http: HttpClient){
        super(http, 'ingredients')
    }

    create(data: IIngredient): Observable<IIngredient | any> {
        return this.post<IIngredient>({ 
            body: data
        });
    }

    findAll(): Observable<(IIngredient | any)[] | any> {
        return this.get<IIngredient[]>();
    }

    findOne(id: string): Observable<IIngredient | any> {
        return this.get<IIngredient>({ endpoint: id });
    }

    remove(id: string): Observable<IIngredient | any> {
        return this.delete<IIngredient>({endpoint:id});
    }

    update(id: string, data: IIngredient): Observable<IIngredient | any> {
        return this.patch<IIngredient>({
            endpoint:id,
            body:data
        })
    }
}