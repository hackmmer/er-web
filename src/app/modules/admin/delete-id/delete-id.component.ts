import { Component, input, output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '@services/api/api.service';

@Component({
  selector: 'app-delete-id',
  imports: [],
  templateUrl: './delete-id.component.html',
  styleUrl: './delete-id.component.css'
})
export class DeleteIdComponent {
  isOpen=input();
  closeModal = output();

  data=input<{id:string, title:string} | null>(null);
  isLoading: boolean = false;

  constructor(private api:ApiService, private translate:TranslateService){

  }

  onSubmit(): void {
    this.isLoading=true
    if(this.data()?.title === this.translate.instant('admin.product')){
      this.api.products.remove(this.data()?.id).subscribe(
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
    else if(this.data()?.title === this.translate.instant('admin.ingredient')){
      this.api.ingredients.remove(this.data()?.id).subscribe(
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
    else if(this.data()?.title === this.translate.instant('admin.category')){
      this.api.category.remove(this.data()?.id).subscribe(
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
    this.closeModal.emit();
  }
}
