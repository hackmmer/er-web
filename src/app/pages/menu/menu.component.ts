import { ApiService } from '@services/api/api.service';
import { Component, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ICustomProduct, IProduct } from '@models/product';

import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { ApiModule } from '@services/api/api.module';
import { AppwriteService } from '@services/appwrite.service';
import { LoadingService } from '@services/loading.service';

@Component({
  selector: 'app-menu',
  imports: [TranslatePipe, CurrencyPipe, ApiModule, NgOptimizedImage],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  products: IProduct[] = []
  custom_products!:ICustomProduct[]

  constructor(private api: ApiService, private appwrite: AppwriteService, public loadingService: LoadingService) {
    this.loadingService.show();
    this.api.products.findAll().subscribe(
      {
        next:(p: IProduct[]) => {
        this.products = p;
        },
        complete: () => {
          this.loadingService.hide();
        }
      }
    );
  }
}
