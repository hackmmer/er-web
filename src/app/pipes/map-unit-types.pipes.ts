import { Pipe, PipeTransform } from '@angular/core';
import { UnitTypes } from '@models/product';

@Pipe({ name: 'mapUnitTypes' })
export class MapUnitTypesPipe implements PipeTransform {
  transform(value: UnitTypes): string {
    const map: Record<UnitTypes, string> = {
      [UnitTypes.g]: 'Gramos',
      [UnitTypes.kg]: 'Kilogramos',
      [UnitTypes.ml]: 'Mililitros',
      [UnitTypes.l]: 'Litros',
      [UnitTypes.unidad]: 'Unidad'
    };
    
    return map[value] || value;
  }
}