import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class EstadosService {

  constructor(private _http: HttpClient, private authService: AuthService) { }

  getEstadosGastos():  Observable<any> {

    return this._http.get(`${environment.api }estados`,  { 'headers': {'content-type': 'application/json', 'Authorization':`Bearer ${this.authService.getToken()}`} });
  }
}
