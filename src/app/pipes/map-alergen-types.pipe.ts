import { Pipe, PipeTransform } from '@angular/core';
import { AlergenTypes } from '@models/product';


@Pipe({ name: 'mapAlergenTypes' })
export class MapAlergenTypesPipe implements PipeTransform {
  transform(value: AlergenTypes[]): string {
    if (!value || value.length === 0) return 'Ninguno';
    
    const names: string[] = value.map(type => {
      return AlergenTypes[type]
        .replace('_', ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    });
    
    return names.join(', ');
  }
}