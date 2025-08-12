import { NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AddEditModalComponent } from './add-edit-modal/add-edit-modal.component';
import { AddEditIngredientsComponent } from './add-edit-ingredients/add-edit-ingredients.component';
import { AddEditCategoryComponent } from './add-edit-category/add-edit-category.component';

@Component({
  selector: 'app-admin',
  imports: [TranslatePipe, NgTemplateOutlet, NgIf, AddEditModalComponent, AddEditIngredientsComponent, AddEditCategoryComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  
  sidebarOpen = false;
  activeItem = 'products';

  show_modal_product=false;
  show_modal_ingredients=false;
  show_modal_category = false;
  isedit:boolean=false

  floatingMenuOpen = false;

  toggleFloatingMenu() {
    this.floatingMenuOpen = !this.floatingMenuOpen;
  }
  
  // Definimos los templates como propiedades públicas
  @ViewChild('productsTemplate', { static: true }) productsTemplate!: TemplateRef<any>;
  @ViewChild('promosTemplate', { static: true }) promosTemplate!: TemplateRef<any>;
  @ViewChild('ordersTemplate', { static: true }) ordersTemplate!: TemplateRef<any>;
  @ViewChild('testimonialsTemplate', { static: true }) testimonialsTemplate!: TemplateRef<any>;
  @ViewChild('usersTemplate', { static: true }) usersTemplate!: TemplateRef<any>;
  @ViewChild('settingsTemplate', { static: true }) settingsTemplate!: TemplateRef<any>;
  @ViewChild('ingredients', { static: true }) ingredientsTemplate!: TemplateRef<any>;
  @ViewChild('categories', { static: true }) categoryTemplate!: TemplateRef<any>;

  // Obtenemos el template actual basado en el ítem activo
  get activeTemplate(): TemplateRef<any> | null {
    switch (this.activeItem) {
      case 'products': return this.productsTemplate;
      case 'ingredients': return this.ingredientsTemplate;
      case 'categories': return this.categoryTemplate;
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
}