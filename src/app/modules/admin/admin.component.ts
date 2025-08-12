import { NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AddEditModalComponent } from './add-edit-modal/add-edit-modal.component';
import { AddEditIngredientsComponent } from './add-edit-ingredients/add-edit-ingredients.component';
import { AddEditCategoryComponent } from './add-edit-category/add-edit-category.component';
import { ApiService } from '@services/api/api.service';
import { ICategory, IIngredient, IProduct } from '@models/product';
import { DataTableComponent } from '../../components/data-table/data-table.component';

@Component({
  selector: 'app-admin',
  imports: [
    TranslatePipe, 
    NgTemplateOutlet, 
    AddEditModalComponent,
    AddEditIngredientsComponent, 
    AddEditCategoryComponent,
    DataTableComponent
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  
  sidebarOpen = false;
  activeItem = 'products';

  show_modal_product=false;
  show_modal_ingredients=false;
  show_modal_category = false;
  show_modal_delete = false;
  
  isedit:boolean=false

  floatingMenuOpen = false;

  // Data
  categories:ICategory[]=[]
  ingredients:IIngredient[]=[]
  products:IProduct[]=[]

  // Columnas del data table
  columns_category=[
    {key:'_id', label:'ID'},
    {key:'name', label:'Nombre'}
  ]
  columns_ingredients=[
    {key:'_id', label:'ID'},
    { key: 'name', label: 'Nombre' },
    { key: 'price', label: 'Precio' },
    { key: 'category', label: 'Categoría' },
    { key: 'stock', label: 'Stock' },
    { key: 'isAlergen', label: 'Es Alérgeno' },
    { key: 'alergenTypes', label: 'Tipos de Alérgenos' },
    { key: 'unit', label: 'Unidad' }
  ]
  columns_products=[
    {key:'_id', label:'ID'},
    { key: 'name', label: 'Nombre' },
    { key: 'price', label: 'Precio' },
    { key: 'category', label: 'Categoría' },
    { key: 'stock', label: 'Stock' },
    { key: 'isAvailable', label: 'Disponible' },
    { key: 'preparationTime', label: 'Tiempo Preparación (min)' }]

  constructor(private api:ApiService){
    this.init_data()
  }

  init_data(){
    this.api.category.findAll().subscribe(e=>{
      this.categories=e
    })
    this.api.ingredients.findAll().subscribe(e=>{
      this.ingredients=e
      console.log(this.ingredients)
    })
    this.api.products.findAll().subscribe(e=>{
      this.products=e
      console.log(this.products)
    })
  }

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
  @ViewChild('ingredientsTemplate', { static: true }) ingredientsTemplate!: TemplateRef<any>;
  @ViewChild('categoriesTemplate', { static: true }) categoriesTemplate!: TemplateRef<any>;

  // Obtenemos el template actual basado en el ítem activo
  get activeTemplate(): TemplateRef<any> | null {
    switch (this.activeItem) {
      case 'products': return this.productsTemplate;
      case 'ingredients': return this.ingredientsTemplate;
      case 'categories': return this.categoriesTemplate;
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