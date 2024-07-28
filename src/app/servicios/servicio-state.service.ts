import { inject, Injectable } from '@angular/core';
import { Observable, Subject, catchError, map, of, startWith, switchMap } from 'rxjs';
import { signalSlice } from 'ngxtension/signal-slice';//ng add ngxtension
import { Proveedores } from '../interface/proveedores';
import { ServicioService } from './servicio.service';
import { ProveedoresRequest } from '../interface/proveedores-request';
interface State {
  datos: Proveedores[];
  status: 'loading' | 'success' | 'error';

}
interface StateSend {
  datos: ProveedoresRequest | null;
  loaded: boolean;

}
@Injectable({
  providedIn: 'root'
})
export class ServicioStateService {

  private proveedoresService = inject(ServicioService);
  //listar
  private initialState: State = {
    datos: [],
    status: 'loading' as const,
  };

  state = signalSlice({
    initialState: this.initialState,
    sources: [
      this.proveedoresService.getProveedores().pipe
      (
        map((datos)=>({datos, status: 'success' as const})),
        catchError(() => {
          return of({
            datos: [],
            status: 'error' as const,
          });
        })
      )
    ],
  });
  //crear
  private initialStateSend: StateSend = {
    datos: null,
    loaded: false,
  };
  stateEnviar = signalSlice({
    initialState: this.initialStateSend,
    actionSources: {

      add: (state, action$: Observable<ProveedoresRequest>) =>
        action$.pipe
      (
        switchMap((data) => this.proveedoresService.addProveedores(data)),
        map((datos) => ({ datos: datos, status: 'success' as const })),
        catchError(() => {
          return of({
            datos: null,
            status: 'error' as const,
          });
        })
      ),

    },
  });
  //editar
  private initialStateEditar: StateSend = {
    datos: null,
    loaded: false,
  };
  stateEditar = signalSlice({
    initialState: this.initialStateEditar,
    actionSources: {

      add: (state, action$: Observable<Proveedores>) =>
        action$.pipe
      (
        switchMap((data) => this.proveedoresService.editProveedores(data)),
        map((datos) => ({ datos: datos, status: 'success' as const })),
        catchError(() => {
          return of({
            datos: null,
            status: 'error' as const,
          });
        })
      ),

    },
  });
}
