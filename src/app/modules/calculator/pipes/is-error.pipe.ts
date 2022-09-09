import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isError',
})
export class IsErrorPipe implements PipeTransform {
  transform(value: unknown): boolean {
    return value instanceof Error;
  }
}
