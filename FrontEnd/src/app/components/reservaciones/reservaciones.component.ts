import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoomModel } from 'src/app/models/RoomModel';
import { SheduleModel } from 'src/app/models/ScheduleModel';
import { SelectModel } from 'src/app/models/SelectModel';
import { ApisService } from 'src/app/services/apis.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservaciones',
  templateUrl: './reservaciones.component.html',
  styleUrls: ['./reservaciones.component.css']
})
export class ReservacionesComponent implements OnInit {

  constructor(
    private router: Router,
    private apisService: ApisService,
    private formBuilder: FormBuilder
  ) { }
  selectRooms: SelectModel[]
  detalles: RoomModel
  horarios: SheduleModel[]
  form: FormGroup;
  idUser = Number(sessionStorage.getItem('iduser'))

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      sala: new FormControl(0, Validators.required),
      capacidad: new FormControl({ value: '', disabled: true }, Validators.required),
      idusuario: new FormControl(this.idUser, Validators.required),
      descripcion: new FormControl('', Validators.required)
    });
    this.getSelectRooms()
    
  }
  

  error: string = ''
  sendError = false
  shedules: number[] = []
  

  submit() {
    this.form.markAllAsTouched()
    if(this.form.valid){
      if(this.shedules.length > 0){
        let data = JSON.parse(JSON.stringify(this.form.value))
        data['shedules'] = this.shedules
        this.apisService.registerReservations(data).subscribe((res)=>{
          console.log(res)
          switch (res.intResponse){
            case 200:
              Swal.fire('Success','Reservacion agregada correctamente.','success')
              break;
          
            default:
              Swal.fire("Error","No se pudo agregar la reservacion.", 'error')
              break
          }
        })
      }else{
        Swal.fire("Error","Selecciona por lo menos un horario.", 'error')
      }
    }else{
      Swal.fire("Error","Verifique que los datos requeridos sean validos.", 'error')
    }
  }
  addShedule(id: number){
    const index = this.shedules.indexOf(id);
    if (index !== -1) {
      this.shedules.splice(index, 1);
    } else {
      this.shedules.push(id)
    }
  }

  async getSelectRooms(){
    try{
      await this.apisService.getSelectRooms()
      .subscribe((res)=>{
        if(res.intResponse === 200){
          this.selectRooms = res.Result
          this.shedules = []
        }
        else{
          Swal.fire('Algo salió mal', 'Hubo un error al buscar las salas', 'error')
        }
      })
    }catch (err){
      console.log(err)
    }
  }

  async getRoomsDetails(){
    try{
      await this.apisService.getRoomsDetails(this.form.controls['sala'].value)
      .subscribe((res)=>{
        if(res.intResponse === 200){
          this.detalles = res.Result.detalles
          this.horarios = res.Result.horarios
          console.log(this.horarios)
          this.form.controls['capacidad'].setValue(this.detalles.capacidad)
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
