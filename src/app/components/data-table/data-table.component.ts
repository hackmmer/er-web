import { NgFor, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { Component, Input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MapAlergenTypesPipe } from '@pipes/map-alergen-types.pipe';
import { MapUnitTypesPipe } from '@pipes/map-unit-types.pipes';

@Component({
  selector: 'app-data-table',
  imports: [NgFor, NgIf, NgSwitchCase, NgSwitch, NgSwitchDefault, MapAlergenTypesPipe, MapUnitTypesPipe, FormsModule],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css'
})
export class DataTableComponent {
  @Input() title:string=''
  @Input() columns: { key: string, label: string }[] = [];
  @Input() data: any[] = [];
  @Input() showActions = true;

  emit_edit = output<{id:string, data:any, title:string }>()
  emit_delete = output<{id:string, title:string}>()

  filteredData: any[] = [];
  searchTerm = '';

  constructor(private translate:TranslateService){

  }

  ngOnChanges() {
    this.filteredData = [...this.data];
    this.applyFilter();
  }

  applyFilter() {
    if (!this.searchTerm) {
      this.filteredData = [...this.data];
      return;
    }

    this.filteredData = this.data.filter(item => 
      Object.values(item).some(val => 
        val?.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );
  }

  isArray(v:any){
    return Array.isArray(v)
  }

  edit(id:string, data:any){
    this.emit_edit.emit({id:id, data:data, title:this.title})
  }

  delete(id:string){
    this.emit_delete.emit({id:id, title:this.title})
  }
}
