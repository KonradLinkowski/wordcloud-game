import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'capitalize'})
export class CapitalizePipe implements PipeTransform {
  transform(text: string): string {
    return text[0].toUpperCase() + text.slice(1);
  }
}
