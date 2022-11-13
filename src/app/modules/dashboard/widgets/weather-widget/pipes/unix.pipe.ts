import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unix',
})
export class UnixPipe implements PipeTransform {
  transform(value: number | null | undefined, timezone: number = 0): Date | null {
    if (typeof value !== 'number') {
      return null;
    }

    const currentTimeZone = new Date().getTimezoneOffset() * 60 * 1_000;
    return new Date(value * 1_000 + timezone * 1_000 + currentTimeZone);
  }
}
