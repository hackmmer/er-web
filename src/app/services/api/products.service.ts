import { Injectable } from '@angular/core';
import { BaseApi, CRUD } from './base-api.class';
import { HttpClient } from '@angular/common/http';
import { IProduct, IProductCreate } from '@models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService
  extends BaseApi
  implements CRUD<IProduct>
{
  
  constructor(http: HttpClient) {
    super(http, 'products');
  }

  findAll() {
    return this.get<IProduct[]>();
  }

  findOne(id: string) {
    return this.get<IProduct>({ endpoint: id });
  }

  create_product(data: IProductCreate) {
    return this.post<IProductCreate>({ 
      body: data
    });
  }

  update_product(id: string, data: IProductCreate): Observable<IProductCreate | any> {
    return this.patch<IProductCreate>({
      endpoint:id,
      body:data
    })
  }

  remove(id: string): Observable<IProduct | any> {
    return this.delete<IProduct>({endpoint:id});
  }
}
