import { NgTemplateOutlet } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { AddEditModalComponent } from './add-edit-modal/add-edit-modal.component';
import { AddEditIngredientsComponent } from './add-edit-ingredients/add-edit-ingredients.component';
import { AddEditCategoryComponent } from './add-edit-category/add-edit-category.component';
import { ApiService } from '@services/api/api.service';
import { ICategory, IIngredient, IProduct } from '@models/product';
import { DataTableComponent } from '@components/data-table/data-table.component';
import { DeleteIdComponent } from './delete-id/delete-id.component';

@Component({
  selector: 'app-admin',
  imports: [
    TranslatePipe,
    NgTemplateOutlet,
    AddEditModalComponent,
    AddEditIngredientsComponent,
    AddEditCategoryComponent,
    DataTableComponent,
    DeleteIdComponent,
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

  data_product: IProduct | null = null;
  data_delete: {id: string, title: string} | null = null;
  data_category: ICategory | null = null;
  data_ingredient: IIngredient | null = null;

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

  constructor(private api:ApiService, private translate:TranslateService){
    this.init_data()
  }

  init_data(){
    this.api.category.findAll().subscribe(e=>{
      this.categories=e
    })
    this.api.ingredients.findAll().subscribe(e=>{
      this.ingredients=e
    })
    this.api.products.findAll().subscribe(e=>{
      this.products=e
    })
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

  add_button(){
    if(this.activeItem==='products'){
      this.show_modal_product = true;
    }else if(this.activeItem==='ingredients'){
      this.show_modal_ingredients = true;
    }else if(this.activeItem==='categories'){
      this.show_modal_category = true;
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

  edit(data:{id:string, data:any, title:string}){
    if(data.title === this.translate.instant('admin.product')){
        this.data_product = data.data;
        this.show_modal_product = true;
    }else if(data.title === this.translate.instant('admin.ingredient')){
        this.data_ingredient = data.data;
        this.show_modal_ingredients = true;
    }else if(data.title === this.translate.instant('admin.category')){
        this.data_category = data.data;
        this.show_modal_category = true;
    }
  }

  delete(data:{id:string, title:string}){
    this.data_delete=data;
    this.show_modal_delete = true;
  }

  onCloseProductModal() {
    this.show_modal_product = false;
    this.data_product = null;  // 2. Resetear variable de datos
    this.init_data();          // 1. Actualizar datos
  }

  // Función para manejar el cierre del modal de ingredientes
  onCloseIngredientModal() {
    this.show_modal_ingredients = false;
    this.data_ingredient = null;  // 2. Resetear variable de datos
    this.init_data();             // 1. Actualizar datos
  }

  // Función para manejar el cierre del modal de categorías
  onCloseCategoryModal() {
    this.show_modal_category = false;
    this.data_category = null;   // 2. Resetear variable de datos
    this.init_data();            // 1. Actualizar datos
  }

  // Función para manejar el cierre del modal de eliminación
  onCloseDeleteModal() {
    this.show_modal_delete = false;
    this.data_delete = null;     // 2. Resetear variable de datos
    this.init_data();            // 1. Actualizar datos
  }
}
