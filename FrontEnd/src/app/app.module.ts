import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './screens/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule} from '@angular/material/button';
import { NavComponent } from './components/nav/nav.component'
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatListModule} from '@angular/material/list';
import { AgregarUsuariosComponent } from './components/agregar-usuarios/agregar-usuarios.component';
import { ReservacionesComponent } from './components/reservaciones/reservaciones.component';
import {MatSelectModule} from '@angular/material/select';
import { ListaReservacionesComponent } from './components/lista-reservaciones/lista-reservaciones.component';
import {MatTableModule} from '@angular/material/table';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';
import { AgregarSalasComponent } from './components/agregar-salas/agregar-salas.component';
import { ListaSalasComponent } from './components/lista-salas/lista-salas.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavComponent,
    AgregarUsuariosComponent,
    ReservacionesComponent,
    ListaReservacionesComponent,
    ListaUsuariosComponent,
    AgregarSalasComponent,
    ListaSalasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatTableModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
