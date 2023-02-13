import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], filter: any): any {
    if (!items || !filter) {
      return items;
    }
    return items.filter(item => 
      Object.keys(filter).every(key => 
        item[key].toString().toLowerCase().indexOf(filter[key].toString().toLowerCase()) !== -1)
    );
  }
}