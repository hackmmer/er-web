import { ApiService } from '@services/api/api.service';
import { Component, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { IProduct } from '@models/product';

import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { ApiModule } from '@services/api/api.module';

@Component({
  selector: 'app-menu',
  imports: [TranslatePipe, CurrencyPipe, ApiModule, NgOptimizedImage],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent implements OnInit {
  products: IProduct[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.products.findAll().subscribe(p => {
      console.log(p);
    });
    
  }
}
