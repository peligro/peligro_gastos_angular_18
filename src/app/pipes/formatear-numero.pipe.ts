import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatearNumero',
  standalone: true
})
export class FormatearNumeroPipe implements PipeTransform {

  transform(value:any) {
    return new Intl.NumberFormat().format(value);
  }

}
