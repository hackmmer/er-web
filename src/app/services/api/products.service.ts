import { Injectable } from '@angular/core';
import { BaseApi, CRUD } from './base-api.class';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '@models/product';
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

  create(data: IProduct) {
    return this.post<IProduct>({ body: data });
  }
}
