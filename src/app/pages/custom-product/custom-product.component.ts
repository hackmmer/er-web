import { CommonModule, CurrencyPipe, LowerCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ICustomProduct, ICustomProductCreate, IIngredient, UnitTypes } from '@models/product';
import { ApiService } from '@services/api/api.service';

@Component({
  selector: 'app-custom-product',
  imports: [CurrencyPipe, LowerCasePipe, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './custom-product.component.html',
  styleUrl: './custom-product.component.css'
})
export class CustomProductComponent {
  isLoading: boolean = false;
  customForm:FormGroup
  ingredients!:IIngredient[]

  constructor(private fb:FormBuilder, private api:ApiService, private router:Router){
    this.customForm = this.fb.group({
      name:['', Validators.required],
      ingredients:[[] as string[], Validators.required]
    })

    this.api.ingredients.findAll().subscribe(
      {
        next: (v:IIngredient[])=>{
          this.ingredients = v
        }
      }
    )
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
        (this.customForm.get('ingredients')?.value as string[]) || [];

      if (!currentIngredients.includes(ingredientId)) {
        this.customForm
          .get('ingredients')
          ?.setValue([...currentIngredients, ingredientId]);
      }

      select.value = '';
    }
  }

  removeIngredient(index: number): void {
    const ingredients = [...this.customForm.get('ingredients')?.value];
    ingredients.splice(index, 1);
    this.customForm.get('ingredients')?.setValue(ingredients);
  }

  onSubmit(): void {
    this.isLoading=true
    if (this.customForm.valid) {
      this.api.custom.create_product(this.customForm.value as ICustomProductCreate)
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.handleClose()
        },
        error: (e) => {
          this.isLoading = false;
          console.log(e);
        },
      });
    }
  }

  handleClose(): void {
    this.customForm.reset();
    this.router.navigate([''])
  }
}
