import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { GastosFijosRequest } from '../interface/gastos-fijos-request';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GastosFijosService {

  constructor(private _http: HttpClient, private authService: AuthService) { }

  getGastosFijos():  Observable<any> {

    return this._http.get(`${environment.api }gastos-fijos`,  { 'headers': {'content-type': 'application/json', 'Authorization':`Bearer ${this.authService.getToken()}`} });
  }
  addGastosFijos(modelo: GastosFijosRequest): Observable<any> {

    return this._http.post(`${environment.api}gastos-fijos`, modelo,  { 'headers': {'content-type': 'application/json', 'Authorization':`Bearer ${this.authService.getToken()}`} })
  }
  editGastosFijos(modelo: GastosFijosRequest, id: any): Observable<any> {

    return this._http.put(`${environment.api}gastos-fijos/${id}`, modelo,  { 'headers': {'content-type': 'application/json', 'Authorization':`Bearer ${this.authService.getToken()}`} })
  }
  deleteGastosFijos(id: any): Observable<any> {

    return this._http.delete(`${environment.api}gastos-fijos/${id}`,  { 'headers': {'content-type': 'application/json', 'Authorization':`Bearer ${this.authService.getToken()}`} })
  }
}
