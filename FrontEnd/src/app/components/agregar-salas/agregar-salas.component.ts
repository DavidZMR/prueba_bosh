import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApisService } from 'src/app/services/apis.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-salas',
  templateUrl: './agregar-salas.component.html',
  styleUrls: ['./agregar-salas.component.css']
})
export class AgregarSalasComponent implements OnInit {

  constructor(
    private router: Router,
    private apisService: ApisService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      nombre: new FormControl('', Validators.required),
      capacidad: new FormControl(20, [Validators.required, Validators.min(1)]),
      horarios: this.formBuilder.array([]),
    });
  }

  error: string = ''
  sendError = false

  form: FormGroup

  

  submit() {
    this.form.markAllAsTouched()
    if(this.form.valid){
      let data = JSON.parse(JSON.stringify(this.form.value))
      console.log(data)
      this.apisService.registerRooms(data).subscribe((res)=>{
        switch (res.intResponse){
          case 200:
            Swal.fire('Success','Usuario agregado correctamente.','success')
            break;
          case 204:
            Swal.fire("Error","El nombre ya ha sido utilizado anteriormente", 'error')
            break;
          
          default:
            Swal.fire("Error","No se pudo agregar usuario.", 'error')
            break
        }
      })
    }else{
      Swal.fire("Error","Verifique que los datos requeridos sean validos.", 'error')
    }
  }
  addHorario() {
    const horarios = this.form.get('horarios') as FormArray;
    horarios.push(this.formBuilder.control('',Validators.required));
  }
  getHorariosControls() {
    const horarios = this.form.get('horarios') as FormArray;
    return horarios ? horarios.controls : [];
  }
}
