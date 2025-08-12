import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component, input, OnChanges, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ICategory, IIngredient, IProduct, IProductCreate, UnitTypes } from '@models/product';
import { ApiService } from '@services/api/api.service';

@Component({
  selector: 'app-add-edit-modal',
  imports: [ReactiveFormsModule, NgFor, CurrencyPipe, NgIf],
  templateUrl: './add-edit-modal.component.html',
  styleUrl: './add-edit-modal.component.css'
})
export class AddEditModalComponent implements OnChanges {

  isEdit=input<IProduct | null>(null);
  isOpen=input();
  closeModal = output();
  productForm: FormGroup;
  isLoading: boolean = false;
  ingredients:IIngredient[]=[]

  categories:ICategory[]=[]

  constructor(private fb: FormBuilder, private api:ApiService) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      description: [''],
      imageUrl: [''],
      isAvailable: [true, Validators.required],
      stock: [0, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      ingredients: [[] as string[], Validators.required],
      isVegetarian: [false],
      isVegan: [false],
      preparationTime: [0, Validators.min(0)]
    });

    this.api.ingredients.findAll().subscribe(e=>{
      this.ingredients = e;
    })

    this.api.category.findAll().subscribe(e=>{
      this.categories=e;
    })
  }

  ngOnChanges(): void {
  if (this.isEdit()) {
      // Convertir ingredientes a array de IDs
      // const ingredientIds = this.isEdit().ingredients.map(i => i.id!);
      
      this.productForm.patchValue({
        ...this.isEdit,
        // ingredients: ingredientIds
      });
    } else if (this.isOpen()) {
      this.productForm.reset({
        isAvailable: true,
        ingredients: []
      });
    }
  }

  getCategoryName(id: string): string {
    return this.categories.find(c => c._id === id)?.name || '';
  }

  onCategorySelect(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const categoryId = select.value;
    
    if (categoryId) {
      this.productForm.get('category')?.setValue(categoryId);
      select.value = '';
    }
  }

  removeCategory(): void {
    this.productForm.get('category')?.setValue('');
  }

  getIngredientName(id: string): string {
    return this.ingredients.find(i => i._id === id)?.name || 'Desconocido';
  }

  getIngredientPrice(id: string): number {
    return this.ingredients.find(i => i._id === id)?.price || 0;
  }

  getIngredientUnit(id: string): UnitTypes {
    return this.ingredients.find(i => i._id === id)?.unit || UnitTypes.unidad;
  }

  onIngredientSelect(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const ingredientId = select.value;
    
    if (ingredientId) {
      const currentIngredients = this.productForm.get('ingredients')?.value as string[] || [];
      
      if (!currentIngredients.includes(ingredientId)) {
        this.productForm.get('ingredients')?.setValue([...currentIngredients, ingredientId]);
      }
      
      select.value = '';
    }
  }

  removeIngredient(index: number): void {
    const ingredients = [...this.productForm.get('ingredients')?.value];
    ingredients.splice(index, 1);
    this.productForm.get('ingredients')?.setValue(ingredients);
  }

  // Enviar formulario
  onSubmit(): void {
    if (this.productForm.valid) {
      console.log(this.productForm.value as IProductCreate)
      this.api.products.create_product(this.productForm.value as IProductCreate).subscribe(
        {
          next: () => {
            this.isLoading = false;
            this.handleClose();
          },
          error: (e) => {
            this.isLoading = false;
            console.log(e)
          }
        }
      )
    }
  }

  // Cerrar modal
  handleClose(): void {
    this.productForm.reset();
    this.closeModal.emit();
  }
}
