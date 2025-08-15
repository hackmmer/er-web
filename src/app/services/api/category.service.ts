import { Injectable } from '@angular/core';
import { BaseApi, CRUD } from './base-api.class';
import { HttpClient } from '@angular/common/http';
import { ICategory} from '@models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService
  extends BaseApi
  implements CRUD<ICategory>
{
  
  constructor(http: HttpClient) {
    super(http, 'category');
  }

  findAll() {
    return this.get<ICategory[]>();
  }

  findOne(id: string) {
    return this.get<ICategory>({ endpoint: id });
  }

  create(data: ICategory) {
    return this.post<ICategory>({ 
      body: data
    });
  }

  remove(id?: string): Observable<ICategory | any> {
    return this.delete<ICategory>({endpoint:id});
  }

  update(id?: string, data?: ICategory): Observable<ICategory | any> {
    return this.patch<ICategory>({
      endpoint:id,
      body:data
    })
  }
}