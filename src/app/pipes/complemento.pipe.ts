import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'complemento',
})
export class ComplementoPipe implements PipeTransform {
  transform(value: string): string {
    let valorFormatado = value;

    valorFormatado = valorFormatado
      .replace(/[^0-9]/, '')
      .replace(/(\d{1})(\d{3})/, '$1.$2');

    return valorFormatado;
  }
}
