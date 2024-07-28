import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { LoginInterface } from '../interface/login-interface';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor( private _http: HttpClient) { }

  getToken(modelo: LoginInterface):Observable<any>
  {

    return this._http.post(`${environment.api}login`, modelo, {'headers': {'content-type': 'application/json'}});
  }

}
