import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/UserModel';
import { ApisService } from 'src/app/services/apis.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  dataSource: UserModel[] = []
  displayedColumns: string[] = ['id', 'username','mail'];

  constructor(
    private apisService: ApisService
  ) { }

  ngOnInit(): void {
    this.getUsers()
  }

  async getUsers(){
    try{
      await this.apisService.getUsers()
      .subscribe((res)=>{
        if(res.intResponse === 200){
          this.dataSource = res.Result
        }
        else{
          Swal.fire('Algo salió mal', 'Hubo un error al buscar los usuarios', 'error')
        }
      })
    }catch (err){
      console.log(err)
    }
  }
}
