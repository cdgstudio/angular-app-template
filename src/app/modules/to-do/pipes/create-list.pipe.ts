import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'createList',
})
export class CreateListPipe implements PipeTransform {
  transform(length: number): number[] {
    return Array.from({ length: length }).map((_, i) => i);
  }
}
