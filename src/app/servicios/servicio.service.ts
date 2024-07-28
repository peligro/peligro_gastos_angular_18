import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ProveedoresRequest } from '../interface/proveedores-request';
import { Proveedores } from '../interface/proveedores';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(private _http: HttpClient, private authService: AuthService) { }

  getProveedores():Observable<any>
  {
    //console.log(`Bearer ${this.authService.getToken()}`);
    return this._http.get(`${environment.api }proveedores`, {'headers': {'content-type': 'application/json', 'Authorization':`Bearer ${this.authService.getToken()}`}});
  }
  addProveedores(modelo: ProveedoresRequest ): Observable<any> {

    return this._http.post(`${environment.api}proveedores`, modelo,  { 'headers': {'content-type': 'application/json', 'Authorization':`Bearer ${this.authService.getToken()}`} })
  }
  editProveedores(modelo: Proveedores): Observable<any> {

    return this._http.put(`${environment.api}proveedores/${modelo.id}`, modelo,  { 'headers': {'content-type': 'application/json', 'Authorization':`Bearer ${this.authService.getToken()}`} })
  }
}
