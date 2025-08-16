import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import {
  Component,
  inject,
  input,
  OnChanges,
  output,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ICategory,
  IIngredient,
  IProduct,
  IProductCreate,
  UnitTypes,
} from '@models/product';
import { ApiService } from '@services/api/api.service';
import { AppwriteService } from '@services/appwrite.service';
import { Models } from 'appwrite';

@Component({
  selector: 'app-add-edit-modal',
  imports: [ReactiveFormsModule, NgFor, CurrencyPipe, NgIf],
  templateUrl: './add-edit-modal.component.html',
  styleUrl: './add-edit-modal.component.css',
})
export class AddEditModalComponent implements OnChanges {
  readonly appwrite = inject(AppwriteService);
  readonly lastFile = signal<Models.File | null>(null);

  data=input<IProduct | null>(null);
  isOpen=input();
  closeModal = output();
  productForm: FormGroup;
  isLoading: boolean = false;
  ingredients: IIngredient[] = [];

  categories: ICategory[] = [];

  constructor(private fb: FormBuilder, private api: ApiService) {
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
      preparationTime: [0, Validators.min(0)],
    });

    this.api.ingredients.findAll().subscribe((e) => {
      this.ingredients = e;
    });

    this.api.category.findAll().subscribe((e) => {
      this.categories = e;
    });
  }

  

  ngOnChanges(): void {
    if (this.data()) {
      const productData = this.data()!;
      
      // 1. Manejar ingredientes de forma segura
      const ingredientIds = productData.ingredients 
        ? productData.ingredients.map(i => i?._id).filter(id => id !== undefined) as string[]
        : [];

      // 2. Manejar categoría de forma segura
      const categoryId = productData.category?._id || '';

      // Crear objeto con valores seguros
      const formValues = {
        name: productData.name || '',
        price: productData.price || 0,
        description: productData.description || '',
        imageUrl: productData.imageUrl || '',
        isAvailable: productData.isAvailable ?? true,
        stock: productData.stock || 0,
        category: categoryId,
        ingredients: ingredientIds,
        isVegetarian: productData.isVegetarian ?? false,
        isVegan: productData.isVegan ?? false,
        preparationTime: productData.preparationTime || 0
      };

      this.productForm.patchValue(formValues);

    } else if (this.isOpen()) {
      this.productForm.reset({
        isAvailable: true,
        ingredients: [],
        stock: 0,
        price: 0,
        category: '',
        isVegetarian: false,
        isVegan: false,
        preparationTime: 0
      });
    }
  }

  getIngredientName(id: string): string {
    return this.ingredients.find((i) => i._id === id)?.name || 'Desconocido';
  }

  getIngredientPrice(id: string): number {
    return this.ingredients.find((i) => i._id === id)?.price || 0;
  }

  getIngredientUnit(id: string): UnitTypes {
    return this.ingredients.find((i) => i._id === id)?.unit || UnitTypes.unidad;
  }

  onIngredientSelect(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const ingredientId = select.value;

    if (ingredientId) {
      const currentIngredients =
        (this.productForm.get('ingredients')?.value as string[]) || [];

      if (!currentIngredients.includes(ingredientId)) {
        this.productForm
          .get('ingredients')
          ?.setValue([...currentIngredients, ingredientId]);
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
    this.isLoading=true
    if (this.productForm.valid) {
      if(this.data()){
        this.api.products
        .update_product(this.data()!._id,this.productForm.value as IProductCreate)
        .subscribe({
          next: () => {
            this.isLoading = false;
            this.handleClose();
          },
          error: (e) => {
            this.isLoading = false;
            console.log(e);
          },
        });
      }else{
        this.api.products
        .create_product(this.productForm.value as IProductCreate)
        .subscribe({
          next: () => {
            this.isLoading = false;
            this.handleClose();
          },
          error: (e) => {
            this.isLoading = false;
            console.log(e);
          },
        });
      }
      
    }
  }

  async onImagePicked(event: Event) {
    const fileInput: HTMLInputElement = event.target as HTMLInputElement; // Here we use only the first file (single file)
    if (!fileInput.files) return;
    const file = fileInput?.files[0];
    this.appwrite.fileCreated.subscribe((f) => {
      this.lastFile.set(f);
      const url = this.appwrite.getFileViewUrl(f.$id);
      this.productForm.patchValue({ imageUrl: url });
    });

    // Upload progress never called (Why?)
    // take a look in future changes
    //
    // this.appwrite.uploadProgress.subscribe((u) => {
    //   console.log(u)
    // })
    const last = this.lastFile()
    if (last && last?.$id)
      await this.appwrite.deleteFile(last.$id);
    this.appwrite.createFile(file);
  }

  // Cerrar modal
  handleClose(): void {
    this.productForm.reset();
    this.closeModal.emit();
  }
}
