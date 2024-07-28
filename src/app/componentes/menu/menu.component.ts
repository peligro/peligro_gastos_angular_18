import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './menu.component.html',
  styles: ``
})
export class MenuComponent {
  perfil_id:any;
  constructor( ){}
  ngOnInit(): void
  {
    //this.perfil_id=this.authService.getPerfilId();
  }
}
