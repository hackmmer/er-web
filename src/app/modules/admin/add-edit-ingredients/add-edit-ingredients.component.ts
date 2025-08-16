import { NgFor, NgIf } from '@angular/common';
import { Component, input, OnChanges, output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AlergenTypes, ICategory, IIngredient, IIngredientCreate, UnitTypes } from '@models/product';
import { ApiService } from '@services/api/api.service';

@Component({
  selector: 'app-add-edit-ingredients',
  imports: [ReactiveFormsModule, NgFor, NgIf],
  templateUrl: './add-edit-ingredients.component.html',
  styleUrl: './add-edit-ingredients.component.css'
})
export class AddEditIngredientsComponent implements OnChanges {
  data=input<IIngredient | null>(null);
  isLoading: boolean = false;
  isOpen=input();
  closeModal = output();

  ingredientForm: FormGroup;
  selectedAlergens: AlergenTypes[] = [];
  alergenTypes = Object.keys(AlergenTypes).filter(key => isNaN(Number(key))).map(key => ({
    name: key,
    value: AlergenTypes[key as keyof typeof AlergenTypes]
  }));
  unitTypes = Object.values(UnitTypes);

  categories:ICategory[] = []

  constructor(private fb: FormBuilder, private api:ApiService) {
    this.ingredientForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      description: [''],
      stock: [0, [Validators.required, Validators.min(0)]],
      category:['', Validators.required],
      isAlergen: [[] as AlergenTypes[], Validators.required],
      isVegetarian: [false, Validators.required],
      isVegan: [false, Validators.required],
      unit: [UnitTypes.g, Validators.required],
      alergenTypes: [[] as AlergenTypes[]]
    });

    this.api.category.findAll().subscribe(e=>{
      this.categories = e;
    })
  }

ngOnChanges(): void {
  if (this.data()) {
    console.log(this.data())
    const ingredientData = this.data()!;
    
    // Asignar selectedAlergens primero
    this.selectedAlergens = [...ingredientData.alergenTypes];
    
    // Preparar valores para el formulario
    const formValues = {
      name: ingredientData.name,
      price: ingredientData.price,
      description: ingredientData.description,
      stock: ingredientData.stock,
      category: ingredientData.category._id, // Solo el ID
      isAlergen: ingredientData.isAlergen,
      isVegetarian: ingredientData.isVegetarian,
      isVegan: ingredientData.isVegan,
      unit: ingredientData.unit,
      alergenTypes: ingredientData.alergenTypes
    };

    this.ingredientForm.patchValue(formValues);
    
  } else if (this.isOpen()) {
    // Reset completo con valores iniciales
    this.ingredientForm.reset({
      name: '',
      price: 0,
      description: '',
      stock: 0,
      category: '',
      isAlergen: false,
      isVegetarian: false,
      isVegan: false,
      unit: UnitTypes.g,
      alergenTypes: []
    });
    this.selectedAlergens = [];
  }
}

   onAlergenChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;
    
    // Convertir el string a valor numérico del enum
    const alergenValue = Number(value) as AlergenTypes;
    
    if (checkbox.checked) {
      if (!this.selectedAlergens.includes(alergenValue)) {
        this.selectedAlergens.push(alergenValue);
      }
    } else {
      this.selectedAlergens = this.selectedAlergens.filter(a => a !== alergenValue);
    }
    
    this.ingredientForm.get('alergenTypes')?.setValue(this.selectedAlergens);
  }

  isAlergenSelected(alergenValue: AlergenTypes): boolean {
    return this.selectedAlergens.includes(alergenValue);
  }

  onSubmit(): void {
    this.isLoading=true
    if (this.ingredientForm.valid) {
      if(this.data()){
        this.api.ingredients.update_ingredient(this.data()!._id, this.ingredientForm.value).subscribe({
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
        this.api.ingredients.create_ingredient({...this.ingredientForm.value, alergenTypes:this.selectedAlergens} as IIngredientCreate).subscribe(
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
  }

  handleClose(): void {
    this.ingredientForm.reset();
    this.selectedAlergens = []
    this.closeModal.emit();
  }
}
