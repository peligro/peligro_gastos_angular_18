import { Routes } from '@angular/router';
import { HomeComponent } from './paginas/home/home.component';
import { LoginComponent } from './paginas/login/login.component';
import { ProveedoresComponent } from './paginas/proveedores/proveedores.component';
import { GastosFijosComponent } from './paginas/gastos-fijos/gastos-fijos.component';
import { GastosPorDiaComponent } from './paginas/gastos-por-dia/gastos-por-dia.component';
import { ErrorComponent } from './paginas/error/error.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {path:"", component: HomeComponent, canActivate:[AuthGuard]},
    {path:"login", component: LoginComponent},
    //{path:"usuarios", component: UsuariosComponent},
    {path:"proveedores", component: ProveedoresComponent, canActivate:[AuthGuard]},
    {path:"gastos-fijos", component: GastosFijosComponent, canActivate:[AuthGuard]},
    {path:"gastos-por-dia", component: GastosPorDiaComponent, canActivate:[AuthGuard]},
    {path: "**", component: ErrorComponent}
];
