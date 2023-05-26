import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from "../models/Response"
import { environment } from 'src/environments/environment';
import { UserModel } from '../models/UserModel';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  body: {}
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  loginAdmin(data: any) {
    return this.http.post<Response<UserModel>>(`${environment.apisURL}/auth/login`, data);
  }
  loginWithToken(strToken: string){
    const data = {strToken};
    return this.http.post<Response<UserModel>>(`${environment.apisURL}/auth/loginToken`,data);
  }
}
