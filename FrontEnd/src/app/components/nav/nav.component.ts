import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  ngOnInit(): void {}

  mobileQuery: MediaQueryList;

  fillerNav = [
    {
      label: 'Agregar usuarios',
      url: 'agregar-usuarios',
      function: '',
      icon: 'assignment_ind'
    },
    {
      label: 'Usuarios',
      url: 'lista-usuarios',
      function: '',
      icon: 'list'
    },
    {
      label: 'Agregar salas',
      url: 'agregar-salas',
      function: '',
      icon: 'meeting_room'
    },
    {
      label: 'Salas',
      url: 'lista-salas',
      function: '',
      icon: 'list'
    },
    {
      label: 'Reservar',
      url: 'reservaciones',
      function: '',
      icon: 'alarm_add'
    },
    {
      label: 'Mis reservaciones',
      url: 'lista-reservaciones',
      function: '',
      icon: 'access_alarm'
    },
    {
      label: 'Cerrar sesión',
      url: '',
      function: 'logout()',
      icon: 'close'
    },
  ];
  user = sessionStorage.getItem('username')
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(
    window.location.host
  );
  logout(){
    this.router.navigate(['/login'])
  }
}
