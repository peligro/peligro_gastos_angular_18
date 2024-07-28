import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';//https://www.npmjs.com/package/ngx-cookie-service
import { TokenService } from '../../servicios/token.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {
  usuario:any;
  constructor( private tokenService:TokenService,  private cookieService:CookieService)
  {
    this.usuario={
      correo:"",
      password:""
    };
  }
  enviar()
  {
     if(this.usuario.correo==0 || this.usuario.correo=='')
     {
      swal.fire({
        icon:'error',
        timer:2000,
        title:'Ups',
        text:'El campo E-Mail es obligatorio'
      });
      return false;
     }
     if(this.usuario.password==0 || this.usuario.password=='')
    {
      swal.fire({
        icon: 'error',
        timer: 2000,
        title: 'Ups',
        text: "El campo Contraseña es obligatorio"
      });
      return false;
    }

    this.tokenService.getToken({correo:this.usuario.correo, password:this.usuario.password}).subscribe({
      next:data=>
      {
        this.cookieService.set('peligro_gastos_token', data.token, 1);
        this.cookieService.set('peligro_gastos_nombre', data.nombre, 1);
        this.cookieService.set('peligro_gastos_id', data.id, 1);
        window.location.href="/";
      },error(err)
      {
        swal.fire({
          icon: 'error',
          title: 'Ops...',
          text: "Las credenciales ingresadas no son válidas "
        });
        setInterval(()=>
          {
            window.location.href="/login";
          }, 3000);

      }
    });
     return true;
  }
}
