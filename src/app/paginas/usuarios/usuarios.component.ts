import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { HeaderComponent } from '../../componentes/header/header.component';
import { FooterComponent } from '../../componentes/footer/footer.component';
import { RouterLink } from '@angular/router';
import { UsuariosService } from '../../servicios/usuarios.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [FormsModule, MenuComponent, HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent {
  datos:any;
  @ViewChild("myModalConf", {static: false}) myModalConf!: TemplateRef<any>;
  modalTitle!: string;
  modelo: any;
  constructor(private authService: AuthService, private usuariosService:UsuariosService, private modalService: NgbModal)
  {
    this.modelo =
    {
      id:"",
      nombre: "",
      correo:"",
      password:""
    };
  }
  ngOnInit(): void {

    this.hacerPeticion();
  }
  crear()
  {
    this.modalService.open(this.myModalConf, {size: 'lg'});
    this.modalTitle="Crear";
    this.modelo =
    {
     id:"",
      nombre: "",
      correo:"",
      password:""
    };
  }
  editar(datos:any)
  {
    this.modalService.open(this.myModalConf, {size: 'lg'});
    this.modelo =
    {
      id:datos.id,
      nombre: datos.nombre,
      correo: datos.correo,
      password:""
    };
    this.modalTitle="Editar";
  }
  cerrar()
  {
    this.modalService.dismissAll();
  }
  hacerPeticion() {

    this.usuariosService.getUsuarios().subscribe(
      {
        next: data => {

          this.datos = data;
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
      this.usuariosService.addUsuarios({ nombre: this.modelo.nombre, correo:this.modelo.correo, password: this.modelo.password }).subscribe({
        next: data => {

          swal.fire({
            icon: 'success',
            timer: 2000,
            title: 'OK',
            text: "Se creó el registro exitosamente"
          });
          setInterval(() => {
            window.location.href = "/usuarios";
          }, 2000);
        },
        error: error => {
          console.log('Error: ' + error.message);
        }
      });
    }
    if(this.modalTitle=="Editar")
    {
      this.usuariosService.editUsuarios({ nombre: this.modelo.nombre, correo:this.modelo.correo, password: this.modelo.password  }, this.modelo.id).subscribe({
        next: data => {

          swal.fire({
            icon: 'success',
            timer: 2000,
            title: 'OK',
            text: "Se modificó el registro exitosamente"
          });
          setInterval(() => {
            window.location.href = "/usuarios";
          }, 2000);
        },
        error: error => {
          console.log('Error: ' + error.message);
        }
      });
    }
  }
}
