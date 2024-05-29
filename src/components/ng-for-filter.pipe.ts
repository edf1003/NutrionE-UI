import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ngForFilter',
  pure: false,
})
export class NgForFilterPipe implements PipeTransform {
  transform(items: unknown[], callback: (item: unknown) => boolean) {
    if (!items || !callback) {
      return items;
    }
    return items.filter(item => callback(item));
  }
}
