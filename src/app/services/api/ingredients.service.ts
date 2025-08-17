import { Injectable } from '@angular/core';
import { BaseApi, CRUD } from './base-api.class';
import { IIngredient, IIngredientCreate } from '@models/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IngredientsService extends BaseApi implements CRUD<IIngredient> {
  constructor(http: HttpClient) {
    super(http, 'ingredients');
  }

  create_ingredient(
    data: IIngredientCreate
  ): Observable<IIngredientCreate | any> {
    return this.post<IIngredientCreate>({
      body: data,
    });
  }

  findAll(): Observable<(IIngredient | any)[] | any> {
    return this.get<IIngredient[]>();
  }

  findOne(id: string): Observable<IIngredient | any> {
    return this.get<IIngredient>({ endpoint: id });
  }

  remove(id?: string): Observable<IIngredient | any> {
    return this.delete<IIngredient>({ endpoint: id });
  }

  update_ingredient(
    id?: string,
    data?: IIngredientCreate
  ): Observable<IIngredientCreate | any> {
    return this.patch<IIngredientCreate>({
      endpoint: id,
      body: data,
    });
  }
}
