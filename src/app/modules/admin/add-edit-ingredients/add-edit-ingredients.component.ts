import { NgFor, NgIf } from '@angular/common';
import { Component, input, OnChanges, output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AlergenTypes, ICategory, IIngredient, UnitTypes } from '@models/product';
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
  alergenTypes = Object.values(AlergenTypes).filter(v => typeof v === 'string') as string[];
  unitTypes = Object.values(UnitTypes);

  categories:ICategory[] = []

  constructor(private fb: FormBuilder, private api:ApiService) {
    this.ingredientForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      description: [''],
      stock: [0, [Validators.required, Validators.min(0)]],
      category:['', Validators.required],
      isAlergen: [false, Validators.required],
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
      this.ingredientForm.patchValue(this.data);
      // this.selectedAlergens = [...this.data()?.alergenTypes];
    } else if (this.isOpen()) {
      this.ingredientForm.reset({
        unit: UnitTypes.g,
        isAlergen: false,
        isVegetarian: false,
        isVegan: false
      });
      this.selectedAlergens = [];
    }
  }

  getCategoryName(id: string): string {
    return this.categories.find(c => c._id === id)?.name || '';
  }

  onCategorySelect(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const categoryId = select.value;
    
    if (categoryId) {
      this.ingredientForm.get('category')?.setValue(categoryId);
      select.value = '';
    }
  }

  removeCategory(): void {
    this.ingredientForm.get('category')?.setValue('');
  }

   onAlergenChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;
    
    // Convertimos el string a AlergenTypes usando aserción de tipo
    const alergenValue = value as unknown as AlergenTypes;
    
    if (checkbox.checked) {
      if (!this.selectedAlergens.includes(alergenValue)) {
        this.selectedAlergens.push(alergenValue);
      }
    } else {
      this.selectedAlergens = this.selectedAlergens.filter(a => a !== alergenValue);
    }
    
    this.ingredientForm.get('alergenTypes')?.setValue(this.selectedAlergens);
  }

  isAlergenSelected(alergenString: string): boolean {
    const alergenValue = alergenString as unknown as AlergenTypes;
    return this.selectedAlergens.includes(alergenValue);
  }

  onSubmit(): void {
    this.isLoading=true
    if (this.ingredientForm.valid) {
      this.api.ingredients.create({...this.ingredientForm.value, alergenTypes:this.selectedAlergens} as IIngredient).subscribe(
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

  handleClose(): void {
    this.ingredientForm.reset();
    this.selectedAlergens = []
    this.closeModal.emit();
  }
}
