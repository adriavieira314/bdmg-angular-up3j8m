import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cep',
})
export class CepPipe implements PipeTransform {
  transform(value: string): string {
    let valorFormatado = value;

    valorFormatado = valorFormatado
      .replace(/[^0-9]/, '')
      .replace(/(\d{5})(\d{3})/, '$1-$2');

    return valorFormatado;
  }
}
