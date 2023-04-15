import { Component, VERSION } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, Subject } from 'rxjs';
import { AppService } from './app.service';
import { Address } from './models/address.interface';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  addressFrom!: FormGroup;
  PAUSE = 500;
  debounce = new Subject<any>();

  constructor(
    private viaCepService: AppService,
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.getAddress();

    this.debounce.pipe(debounceTime(this.PAUSE)).subscribe((event) => {
      let value = event.target.value ? event.target.value.replace('-', '') : '';

      if (value.length >= 8 && value !== '') {
        this.getAddress(value);
      }
    });
  }

  ngOnDestroy(): void {
    this.debounce.unsubscribe();
  }

  getAddress(valor?: string) {
    this.viaCepService.getAddressInfo(valor).subscribe({
      next: (res) => this.buildForm(res),
      error: () => alert('Houve um erro a fazer a consulta.'),
    });
  }

  buildForm(address?: Address) {
    this.addressFrom = this.formBuilder.group({
      cep: [
        address ? address.cep : '',
        [Validators.required, Validators.maxLength(9)],
      ],
      logradouro: [address ? address.logradouro : ''],
      bairro: [address ? address.bairro : ''],
      localidade: [address ? address.localidade : ''],
      uf: [address ? address.uf : ''],
      complemento: [address ? address.complemento : ''],
      ibge: [{ value: address ? address.ibge : '', disabled: true }],
      gia: [address ? address.gia : ''],
      ddd: [address ? address.ddd : ''],
      siafi: [{ value: address ? address.siafi : '', disabled: true }],
    });
  }

  saveOnStorage() {
    const address = this.addressFrom.getRawValue() as Address;
    localStorage.setItem('addressObject', JSON.stringify(address));
    alert('Objeto salvo');
  }
}
