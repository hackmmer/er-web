import { NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { IProduct } from '@models/product';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-admin',
  imports: [TranslatePipe, NgTemplateOutlet, NgIf],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  
  sidebarOpen = false;
  activeItem = 'products';
  
  // Definimos los templates como propiedades públicas
  @ViewChild('productsTemplate', { static: true }) productsTemplate!: TemplateRef<any>;
  @ViewChild('promosTemplate', { static: true }) promosTemplate!: TemplateRef<any>;
  @ViewChild('ordersTemplate', { static: true }) ordersTemplate!: TemplateRef<any>;
  @ViewChild('testimonialsTemplate', { static: true }) testimonialsTemplate!: TemplateRef<any>;
  @ViewChild('usersTemplate', { static: true }) usersTemplate!: TemplateRef<any>;
  @ViewChild('settingsTemplate', { static: true }) settingsTemplate!: TemplateRef<any>;

  // Obtenemos el template actual basado en el ítem activo
  get activeTemplate(): TemplateRef<any> | null {
    switch (this.activeItem) {
      case 'products': return this.productsTemplate;
      case 'promos': return this.promosTemplate;
      case 'orders': return this.ordersTemplate;
      case 'testimonials': return this.testimonialsTemplate;
      case 'users': return this.usersTemplate;
      case 'settings': return this.settingsTemplate;
      default: return null;
    }
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  setActiveItem(itemId: string) {
    this.activeItem = itemId;
    if (this.sidebarOpen) {
      this.sidebarOpen = false;
    }
  }

  add_edit_product(product?:IProduct){
    
  }
}