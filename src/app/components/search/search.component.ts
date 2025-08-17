import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '@models/product';
import { TranslatePipe } from '@ngx-translate/core';
import { ApiService } from '@services/api/api.service';
import { LoadingService } from '@services/loading.service';

@Component({
  selector: 'app-search',
  imports: [TranslatePipe, NgOptimizedImage, CurrencyPipe],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchTerm: string = '';
  results: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    public loading:LoadingService
  ) {}

  ngOnInit(): void {
    this.loading.show()
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['q'] || '';
      if (this.searchTerm) {
        this.searchProducts();
      }
    });
  }

  searchProducts() {
    this.api.products.findAll().subscribe({
      next: (p: IProduct[]) => {
        // Preprocesar el término de búsqueda: minúsculas y dividir en palabras
        const searchTerms = this.searchTerm.toLowerCase().split(/\s+/).filter(term => term);
        
        // Si no hay términos válidos, devolver array vacío
        if (searchTerms.length === 0) {
          this.results = [];
          this.loading.hide();
          return;
        }

        // Filtrar productos que contengan al menos un término de búsqueda
        this.results = p.filter(product => 
          searchTerms.some(term => 
            product.name.toLowerCase().includes(term)
        ))
        
        this.loading.hide();
      },
      error: (error) => {
        console.error('Search error:', error);
        this.loading.hide();
      }
    })
  }


}
