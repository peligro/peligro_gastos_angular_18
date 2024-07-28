import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { HeaderComponent } from '../../componentes/header/header.component';
import { FooterComponent } from '../../componentes/footer/footer.component';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import dayjs from 'dayjs';
import "dayjs/locale/es";
import { DatePipe } from '@angular/common';
import { GastosFijosService } from '../../servicios/gastos-fijos.service';
import { FormatearFechaPipe } from '../../pipes/formatear-fecha.pipe';
import { FormatearNumeroPipe } from '../../pipes/formatear-numero.pipe';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import swal from 'sweetalert2';
import { EstadosService } from '../../servicios/estados.service';
import { ServicioService } from '../../servicios/servicio.service';

@Component({
  selector: 'app-gastos-fijos',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, MenuComponent, FormsModule, RouterLink, DatePipe, FormatearFechaPipe, FormatearNumeroPipe],
  templateUrl: './gastos-fijos.component.html',
  styles: ``
})
export class GastosFijosComponent {
  datos!:Array<any>;
  proveedores!:Array<any>;
  estados!:Array<any>;
  fecha:any;
  si!:any;
  no!:any;
  @ViewChild("myModalConf", {static: false}) myModalConf!: TemplateRef<any>;
  modalTitle!: string;
  modelo: any;
  constructor(private authService: AuthService, private gastosFijosService:GastosFijosService, private modalService: NgbModal, private proveedoresService:ServicioService, private estadosService:EstadosService)
  {
    this.fecha=new Date();
    this.modelo =
    {
      id: "",
      nombre: "",
      monto: "",
      proveedores_id: "0"
    };
  }

  ngOnInit(): void {
    this.hacerPeticion();
    this.traeProveedores();
    this.traeEstados();
  }
  crear()
  {
    this.modalService.open(this.myModalConf, {size: 'lg'});
    this.modalTitle="Crear";
    this.modelo =
    {
      id: "",
      nombre: "",
      monto: "",
      proveedores_id: "0"
    };
  }
  editar(datos:any)
  {
    this.modalService.open(this.myModalConf, {size: 'lg'});
    this.modelo =
    {
      id: datos.id,
      nombre: datos.nombre,
      monto: datos.monto,
      proveedores_id: datos.proveedores_id
    };
    this.modalTitle="Editar";
  }
  eliminar(id:any)
  {
    swal.fire({

      title: '¿Realmente desea eliminar este registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'NO',
      confirmButtonText: 'SI'
    }).then(async (result) => {
      if (result.isConfirmed) {
        this.gastosFijosService.deleteGastosFijos(id).subscribe({
          next:data=>
          {
            swal.fire({
              icon: 'success',
              title: 'OK',
              text: "Se eliminó el registro exitosamente"
            });
            setInterval(() => {
              window.location.href = "/gastos-fijos";
            }, 2000);
          },error:error=>
          {
            console.log('Error: ' + error.message);
          }
        });
      }

    });
  }
  cerrar()
  {
    this.modalService.dismissAll();
  }
  getMesActual()
  {
    let date=new Date();
    dayjs.locale('es') ;
    return dayjs(date).format("MMMM");
  }
  hacerPeticion() {

    this.gastosFijosService.getGastosFijos().subscribe(
      {
        next: data => {
          this.datos = data;
          let sumaSi=0;
          let sumaNo=0;
          for(let dato of this.datos)
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
          this.si=sumaSi;
          this.no=sumaNo;
        },
        error: error => {
          console.log('Error: ' + error.message);
        }
      }
    );
  }
  traeProveedores()
  {
    this.proveedoresService.getProveedores().subscribe({
      next:data=>
      {
        this.proveedores =data;
      },error:error=>
      {
        console.log('Error: ' + error.message);
      }
    });
  }
  traeEstados() {

    this.estadosService.getEstadosGastos().subscribe(
      {
        next: data => {

          this.estados = data;
        },
        error: error => {
          console.log('Error: ' + error.message);
        }
      }
    );
  }
  enviar()
  {
    if(this.modalTitle=="Crear")
    {
      this.gastosFijosService.addGastosFijos({nombre: this.modelo.nombre, monto: this.modelo.monto, proveedores_id: this.modelo.proveedores_id}).subscribe({
        next:data=>
        {
          swal.fire({
            icon: 'success',
            title: 'OK',
            text: "Se creó el registro exitosamente"
          });
          setInterval(() => {
            window.location.href = "/gastos-fijos";
          }, 2000);
        },
        error:error=>
        {
          console.log('Error: ' + error.message);
        }
      });
    }
    if(this.modalTitle=="Editar")
    {
      this.gastosFijosService.editGastosFijos({
        nombre:this.modelo.nombre ,
        monto: this.modelo.monto,
        proveedores_id: this.modelo.proveedoresId
      }, this.modelo.id).subscribe({
        next: data => {

          swal.fire({
            icon: 'success',
            timer: 2000,
            title: 'OK',
            text: "Se modificó el registro exitosamente"
          });
          setInterval(() => {
            window.location.href = "/gastos-fijos";
          }, 2000);
        },
        error: error => {
          console.log('Error: ' + error.message);
        }
      });
    }
  }
}
