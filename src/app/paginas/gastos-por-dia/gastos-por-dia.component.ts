import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { HeaderComponent } from '../../componentes/header/header.component';
import { FooterComponent } from '../../componentes/footer/footer.component';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { FormsModule } from '@angular/forms';
import dayjs from 'dayjs';
import "dayjs/locale/es";
import swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { GastosPorDiaService } from '../../servicios/gastos-por-dia.service';
import { FormatearFechaPipe } from '../../pipes/formatear-fecha.pipe';
import { FormatearNumeroPipe } from '../../pipes/formatear-numero.pipe';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';
import { ServicioService } from '../../servicios/servicio.service';

@Component({
  selector: 'app-gastos-por-dia',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, MenuComponent, FormsModule, DatePipe, FormatearFechaPipe, FormatearNumeroPipe, RouterLink],
  templateUrl: './gastos-por-dia.component.html',
  styles: ``
})
export class GastosPorDiaComponent implements OnInit {
  datos!:Array<any>;
  proveedores!:Array<any>;
  fecha:any;
  total:any;
  @ViewChild("myModalConf", {static: false}) myModalConf!: TemplateRef<any>;
  modalTitle!: string;
  modelo: any;
  constructor(private authService: AuthService, private gastosPorDiaService: GastosPorDiaService, private modalService: NgbModal, private proveedoresService:ServicioService)
  {
    this.fecha=new Date();
    this.modelo =
    {
      id: "",
      neto: "",
      iva: "",
      total:"",
      glosa:"",
      proveedores_id: "0"
    };
  }
  ngOnInit(): void {
    this.hacerPeticion();
    this.traeProveedores();
  }
  crear()
  {
    this.modalService.open(this.myModalConf, {size: 'lg'});
    this.modalTitle="Crear";
    this.modelo =
    {
      id: "",
      neto: "",
      iva: "",
      total:"",
      glosa:"",
      proveedores_id: "0"
    };
  }
  editar(datos:any)
  {
    this.modalService.open(this.myModalConf, {size: 'lg'});

    this.modelo =
    {
      id: datos.id,
      neto: datos.neto,
      iva: datos.iva,
      total:datos.total,
      glosa:datos.glosa,
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
        this.gastosPorDiaService.deleteGastosPorDia(id).subscribe({
          next: data => {

            swal.fire({
              icon: 'success',
              timer: 2000,
              title: 'OK',
              text: "Se eliminó el registro exitosamente"
            });
            setInterval(() => {
              window.location.href = "/gastos-por-dia";
            }, 2000);
          },
          error: error => {
            console.log('Error: ' + error.message);
          }
        });
      }

    });
  }
  hacerPeticion() {

    this.gastosPorDiaService.getGastosPorDia().subscribe(
      {
        next: data => {
          this.datos = data;
          let sum=0;
          for(let dato of this.datos)
          {
            sum=sum+dato.total;
          }
          this.total=sum;
        },
        error: error => {
          console.log('Error: ' + error.message);
        }
      }
    );
  }
  traeProveedores() {

    this.proveedoresService.getProveedores().subscribe(
      {
        next: data => {

          this.proveedores = data;
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
  cerrar()
  {
    this.modalService.dismissAll();
  }
  enviar()
  {
    if(this.modalTitle=="Crear")
    {
      this.gastosPorDiaService.addGastosPorDia({

        "neto": this.modelo.neto,
        "iva": this.modelo.iva,
        "total": this.modelo.total,
        "glosa": this.modelo.glosa,
        "proveedores_id": this.modelo.proveedores_id
    }).subscribe({
        next: data => {

          swal.fire({
            icon: 'success',
            timer: 2000,
            title: 'OK',
            text: "Se creó el registro exitosamente"
          });
          setInterval(() => {
            window.location.href = "/gastos-por-dia";
          }, 2000);
        },
        error: error => {
          console.log('Error: ' + error.message);
        }
      });
    }
    if(this.modalTitle=="Editar")
    {
      this.gastosPorDiaService.editGastosPorDia({

        "neto": this.modelo.neto,
        "iva": this.modelo.iva,
        "total": this.modelo.total,
        "glosa": this.modelo.glosa,
        "proveedores_id": this.modelo.proveedores_id
    }, this.modelo.id).subscribe({
        next: data => {

          swal.fire({
            icon: 'success',
            timer: 2000,
            title: 'OK',
            text: "Se modificó el registro exitosamente"
          });
          setInterval(() => {
            window.location.href = "/gastos-por-dia";
          }, 2000);
        },
        error: error => {
          console.log('Error: ' + error.message);
        }
      });
    }
  }
}
