import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unix',
})
export class UnixPipe implements PipeTransform {
  transform(value: number | null | undefined): Date | null {
    if (typeof value !== 'number') {
      return null;
    }
    return new Date(value * 1_000);
  }
}
