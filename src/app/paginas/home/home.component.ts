import { Component, OnInit } from '@angular/core';
import dayjs from 'dayjs';
import "dayjs/locale/es";
import { FooterComponent } from '../../componentes/footer/footer.component';
import { HeaderComponent } from '../../componentes/header/header.component';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormatearNumeroPipe } from '../../pipes/formatear-numero.pipe';
import { GastosPorDiaService } from '../../servicios/gastos-por-dia.service';
import { GastosFijosService } from '../../servicios/gastos-fijos.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, MenuComponent, RouterLink, DatePipe, FormatearNumeroPipe],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent implements OnInit {
  fecha:any;
  gastosFIjosTotal!:any;
  gastosPorDiaTotal!:any;

  constructor( private gastosFijosService: GastosFijosService, private gastosPorDiaService:GastosPorDiaService)
  {
    this.fecha=new Date();
  }
  ngOnInit(): void {
    this.fecha=new Date();
    this.hacerPeticion();
 }
 hacerPeticion()
  {
    this.gastosFijosService.getGastosFijos().subscribe({
      next: data =>
      {
          let sumaSi=0;
          let sumaNo=0;
          for(let dato of data)
          {
            if(dato.estados_id==1)
            {
              sumaSi=sumaSi+dato.monto;
            }
            if(dato.estados_id==2)
            {
              sumaNo=sumaNo+dato.monto;
            }
          }
          this.gastosFIjosTotal=sumaSi-sumaNo;
      },error:error=>
      {
        console.log('Error: ' + error.message);
      }
    });
    this.gastosPorDiaService.getGastosPorDia().subscribe(
      {
        next: data => {


           let sum=0;
           for(let dato of data)
           {
            sum=sum+dato.total;
           }
           this.gastosPorDiaTotal=sum;
        },
        error: error => {
          console.log('Error: ' + error.message);
        }
      }
    );
  }
  getMesActual()
  {
    let date=new Date();
    dayjs.locale('es') ;
    return dayjs(date).format("MMMM");
  }

}
