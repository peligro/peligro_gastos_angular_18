import { Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../componentes/header/header.component';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { FooterComponent } from '../../componentes/footer/footer.component';
import { ServicioService } from '../../servicios/servicio.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import swal from 'sweetalert2';
import { RouterLink } from '@angular/router';
import { ServicioStateService } from '../../servicios/servicio-state.service';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [FormsModule, HeaderComponent, MenuComponent, FooterComponent, RouterLink],
  templateUrl: './proveedores.component.html',
  styles: ``
})
export class ProveedoresComponent {
  datos=inject(ServicioStateService);
  @ViewChild("myModalConf", {static:false}) myModalConf!:TemplateRef<any>;
  modalTitle!:string;
  modelo: any;
  constructor(   private modalService:NgbModal)
  {
    this.modelo =
    {
      id:"",
      nombre: ""
    };
   }

  ngOnInit(): void {
    //this.authService.metodoAuth();
    //this.hacerPeticion();
  }

  crear()
  {
    this.modalService.open(this.myModalConf, {size: 'lg'});
    this.modalTitle="Crear";
    this.modelo =
    {
     id:"",
      nombre: ""
    };

  }
  editar(arreglo:any)
  {
    this.modalService.open(this.myModalConf, {size: 'lg'});
    this.modalTitle="Editar";
    this.modelo =
    {
      id:arreglo.id,
      nombre: arreglo.nombre
    };
  }
  cerrar()
  {
    this.modalService.dismissAll();
  }
  enviar()
  {
    if(this.modalTitle=="Crear")
    {
      this.datos.stateEnviar.add(this.modelo);
      swal.fire({
        icon: 'success',
        title: 'OK',
        text: "Se creó el registro exitosamente"
      });
      setInterval(() => {
        window.location.href = "/proveedores";
      }, 2000);
    }
    if(this.modalTitle=="Editar")
    {
      this.datos.stateEditar.add(this.modelo);
      swal.fire({
        icon: 'success',
        title: 'OK',
        text: "Se modificó el registro exitosamente"
      });
      setInterval(() => {
        window.location.href = "/proveedores";
      }, 2000);
    }
  }
}
