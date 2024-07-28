import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import dayjs from 'dayjs';
import "dayjs/locale/es";
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent {
  hora:any;
  nombre:any;
  constructor( private authService: AuthService){}
  ngOnInit(): void {
     this.getHoraActual();
     this.nombre=this.authService.getNombre();
  }
  getFechaActual()
  {
    dayjs.locale('es');
    let fecha = new Date();
    return dayjs(fecha)
    .format("dddd") +" "+dayjs(fecha).format("DD")+" de "+dayjs(fecha).format("MMMM")+" de "+dayjs(fecha).format("YYYY");
  }
  getHoraActual()
  {
    this.hora=new Date();
    setInterval(()=>
    {
      this.hora=new Date();
    }, 1000);
  }
  cerrarSesion()
  {
    return this.authService.metodoCerrarSesion();
  }
}
