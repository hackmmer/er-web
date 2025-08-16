import { Component, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ICategory } from '@models/product';
import { ApiService } from '@services/api/api.service';

@Component({
  selector: 'app-add-edit-category',
  imports: [ReactiveFormsModule],
  templateUrl: './add-edit-category.component.html',
  styleUrl: './add-edit-category.component.css'
})
export class AddEditCategoryComponent implements OnChanges {
  data=input<ICategory | null>(null);
  isLoading: boolean = false;
  isOpen=input();
  closeModal = output();

  categoryform: FormGroup;

  constructor(private fb:FormBuilder, private api: ApiService){
    this.categoryform = this.fb.group({
      name:['', Validators.required]
    })
  }
  
  ngOnChanges(): void {
   if (this.data()) {
      this.categoryform.patchValue({
        name: this.data()?.name
      });
    } else if (this.isOpen()) {
      this.categoryform.reset();
    }
  }

  onSubmit(): void {
    this.isLoading=true
    if (this.categoryform.valid) {
      if(this.data()){
        this.api.category.update(this.data()!._id, this.categoryform.value as ICategory)
      }else{
        this.api.category.create(this.categoryform.value as ICategory).subscribe(
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
    this.categoryform.reset();
    this.closeModal.emit();
  }
}
