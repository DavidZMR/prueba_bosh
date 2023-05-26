import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './screens/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { AgregarUsuariosComponent } from './components/agregar-usuarios/agregar-usuarios.component';
import { ReservacionesComponent } from './components/reservaciones/reservaciones.component';
import { ListaReservacionesComponent } from './components/lista-reservaciones/lista-reservaciones.component';
import { LoginGuard } from './guards/login.guard';
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';
import { AgregarSalasComponent } from './components/agregar-salas/agregar-salas.component';
import { ListaSalasComponent } from './components/lista-salas/lista-salas.component';

const routes: Routes = [
  {path: '',component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: NavComponent, canActivate:[LoginGuard], runGuardsAndResolvers: 'always' , children: [
    {path: 'agregar-usuarios',component: AgregarUsuariosComponent},
    {path: 'reservaciones',component: ReservacionesComponent },
    {path: 'lista-reservaciones',component: ListaReservacionesComponent},
    {path: 'lista-usuarios', component: ListaUsuariosComponent},
    {path: 'agregar-salas', component: AgregarSalasComponent},
    {path: 'lista-salas', component: ListaSalasComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
