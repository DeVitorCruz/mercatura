import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'min',
})
export class MinPipe implements PipeTransform {
  public transform(values: number[]): number {
    return Math.min(...values);
  }
}
