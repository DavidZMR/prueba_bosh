import { Component, OnInit } from '@angular/core';
import { RoomModel } from 'src/app/models/RoomModel';
import { ApisService } from 'src/app/services/apis.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-salas',
  templateUrl: './lista-salas.component.html',
  styleUrls: ['./lista-salas.component.css']
})
export class ListaSalasComponent implements OnInit {

  idusuario = Number(sessionStorage.getItem('iduser'))
  dataSource: RoomModel[] = []
  displayedColumns: string[] = ['id','sala','capacidad','horarios'];
   
  constructor(
    private apisService: ApisService
  ) { }

  ngOnInit(): void {
    this.getReservations()
  }

  async getReservations(){
    try{
      console.log(this.idusuario)
      await this.apisService.getRooms()
      .subscribe((res)=>{
        if(res.intResponse === 200){
          this.dataSource = res.Result
        }
        else{
          Swal.fire('Algo salió mal', 'Hubo un error al buscar las salas', 'error')
        }
      })
    }catch (err){
      console.log(err)
    }
  }
}
