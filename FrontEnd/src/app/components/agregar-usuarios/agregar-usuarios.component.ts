import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApisService } from 'src/app/services/apis.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-usuarios',
  templateUrl: './agregar-usuarios.component.html',
  styleUrls: ['./agregar-usuarios.component.css']
})
export class AgregarUsuariosComponent implements OnInit {

  constructor(
    private router: Router,
    private apisService: ApisService
  ) { }

  ngOnInit(): void {
  }

  error: string = ''
  sendError = false

  form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    mail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  submit() {
    this.form.markAllAsTouched()
    if(this.form.valid){
      let data = JSON.parse(JSON.stringify(this.form.value))
      this.apisService.registerUser(data).subscribe((res)=>{
        switch (res.intResponse){
          case 200:
            Swal.fire('Success','Usuario agregado correctamente.','success')
            break;
          case 204:
            Swal.fire("Error","El correo ya ha sido utilizado anteriormente", 'error')
            break;
          case 205:
            Swal.fire("Error","El username ya ha sido registrado utilizado", 'error')
            break
          default:
            Swal.fire("Error","No se pudo agregar usuario.", 'error')
            break
        }
      })
    }else{
      Swal.fire("Error","Verifique que los datos requeridos sean validos.", 'error')
    }
  }
}
