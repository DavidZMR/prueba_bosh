import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.tryAutoLogin();
  }
  private async tryAutoLogin(){
    const token = sessionStorage.getItem('token')
    if(token){
      const res = await this.authService.loginWithToken(token).toPromise();
      if(res){
        if(res.intResponse === 200){
          sessionStorage.setItem('iduser', res.Result.idusuario.toString())
          sessionStorage.setItem('username',res.Result.username)
          sessionStorage.setItem('mail',res.Result.mail)
          return true;
        }else{
          localStorage.clear();
          sessionStorage.clear();
          this.router.navigate(['/login']);
          return false;
        }
      }else{
        localStorage.clear();
        sessionStorage.clear();
        this.router.navigate(['/login']);
        return false;
      }
      
    }else{
      this.router.navigate(['/login']);
      return false;
    }
  }
}
