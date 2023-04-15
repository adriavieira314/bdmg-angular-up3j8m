import { Component, VERSION } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(
    private viaCepService: AppService,
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.getAddress();
  }

  getAddress() {
    this.viaCepService.getAddressInfo().subscribe((res) => {
      this.buildForm(res);
      return res;
    });
  }

  buildForm(address?: Address) {
    this.addressFrom = this.formBuilder.group({
      cep: [
        address ? address.cep : '',
        Validators.compose([Validators.required, Validators.maxLength(9)]),
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
  }
}
