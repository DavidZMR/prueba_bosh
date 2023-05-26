import { Component, OnInit } from '@angular/core';
import { ReservationModule } from 'src/app/models/ReservationModel';
import { ApisService } from 'src/app/services/apis.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-reservaciones',
  templateUrl: './lista-reservaciones.component.html',
  styleUrls: ['./lista-reservaciones.component.css']
})


export class ListaReservacionesComponent implements OnInit {

  
  idusuario = Number(sessionStorage.getItem('iduser'))
  dataSource: ReservationModule[] = []
  displayedColumns: string[] = ['id','sala','capacidad', 'descripcion','horarios'];
   
  constructor(
    private apisService: ApisService
  ) { }

  ngOnInit(): void {
    this.getReservations()
  }

  async getReservations(){
    try{
      console.log(this.idusuario)
      await this.apisService.getReservations(this.idusuario)
      .subscribe((res)=>{
        if(res.intResponse === 200){
          this.dataSource = res.Result
        }
        else{
          Swal.fire('Algo salió mal', 'Hubo un error al buscar las reservaciones', 'error')
        }
      })
    }catch (err){
      console.log(err)
    }
  }
}
