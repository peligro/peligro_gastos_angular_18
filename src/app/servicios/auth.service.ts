import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private cookieService: CookieService) { }


  metodoCerrarSesion()
  {
    swal.fire({
      position: 'top-end',
      title: '¿Realmente desea cerrar su sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'NO',
      confirmButtonText: 'SI'
    }).then(async (result) => {
      if (result.isConfirmed) {
        this.cookieService.deleteAll();
        window.location.href="/login";
      }

    });
  }
  getId()
  {
    return this.cookieService.get('peligro_gastos_id');
  }
  getNombre()
  {
    return this.cookieService.get('peligro_gastos_nombre');
  }
  getToken()
  {
    return this.cookieService.get('peligro_gastos_token');
  }
}
