import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from './models/address.interface';

@Injectable()
export class AppService {
  private readonly API = 'https://viacep.com.br/ws/30160907/json/';

  constructor(private http: HttpClient) {}

  getAddressInfo(): Observable<Address> {
    return this.http.get<Address>(this.API);
  }
}
