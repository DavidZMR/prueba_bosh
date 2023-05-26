import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
  }

  error: string = ''
  sendError = false

  form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  submit() {
    this.form.markAllAsTouched()
    if (this.form.valid) {
      this.sendError = false
      this.error = ''
      let data = JSON.parse(JSON.stringify(this.form.value))
      this.auth.loginAdmin(data).subscribe((res)=>{
        if(res.intResponse === 200){
          this.router.navigate(['/home'])
        }else{
          this.error = 'Error'
        }
      })
      
    }else{
      this.sendError = true
      this.error = 'User or password incorrect'
    }
    
  }

}
