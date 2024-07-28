import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { GastosPorDiaRequest } from '../interface/gastos-por-dia-request';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GastosPorDiaService {

  constructor(private _http: HttpClient , private authService: AuthService ) { }

  getGastosPorDia():  Observable<any> {

    return this._http.get(`${environment.api }gastos-por-dia`,  { 'headers': {'content-type': 'application/json', 'Authorization':`Bearer ${this.authService.getToken()}`} });
  }
  addGastosPorDia(modelo: GastosPorDiaRequest): Observable<any> {

    return this._http.post(`${environment.api}gastos-por-dia`, modelo,  { 'headers': {'content-type': 'application/json', 'Authorization':`Bearer ${this.authService.getToken()}`} })
  }
  editGastosPorDia(modelo: GastosPorDiaRequest, id: any): Observable<any> {

    return this._http.put(`${environment.api}gastos-por-dia/${id}`, modelo,  { 'headers': {'content-type': 'application/json', 'Authorization':`Bearer ${this.authService.getToken()}`} })
  }
  deleteGastosPorDia(id: any): Observable<any> {

    return this._http.delete(`${environment.api}gastos-por-dia/${id}`,  { 'headers': {'content-type': 'application/json', 'Authorization':`Bearer ${this.authService.getToken()}`} })
  }
}
