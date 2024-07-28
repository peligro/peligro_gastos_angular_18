import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { UsuariosRequest } from '../interface/usuarios-request';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private _http: HttpClient, private authService: AuthService ) { }

  getUsuarios():  Observable<any> {

    return this._http.get(`${environment.api }usuarios`,  { 'headers': {'content-type': 'application/json', 'Authorization':`Bearer ${this.authService.getToken()}`} });
  }
  addUsuarios(modelo: UsuariosRequest): Observable<any> {

    return this._http.post(`${environment.api}usuarios`, modelo,  { 'headers': {'content-type': 'application/json', 'Authorization':`Bearer ${this.authService.getToken()}`} })
  }
  editUsuarios(modelo: UsuariosRequest, id: any): Observable<any> {

    return this._http.put(`${environment.api}usuarios/${id}`, modelo,  { 'headers': {'content-type': 'application/json', 'Authorization':`Bearer ${this.authService.getToken()}`} })
  }
}
