import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from './models/address.interface';

@Injectable()
export class AppService {
  private readonly API = 'https://viacep.com.br/ws/';

  constructor(private http: HttpClient) {}

  getAddressInfo(valor: string = '30160907'): Observable<Address> {
    return this.http.get<Address>(`${this.API}` + valor + `/json/`);
  }
}
