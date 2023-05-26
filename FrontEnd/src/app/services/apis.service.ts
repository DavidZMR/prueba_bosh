import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from "../models/Response"
import { environment } from 'src/environments/environment';
import { UserModel } from '../models/UserModel';
import { SelectModel } from '../models/SelectModel';
import { RoomModel } from '../models/RoomModel';
import { SheduleModel } from '../models/ScheduleModel';
import { ReservationModule } from '../models/ReservationModel';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  body: {}
};
@Injectable({
  providedIn: 'root'
})
export class ApisService {

  constructor(
    private http: HttpClient
  ) { }

  registerUser(data: any){
    return this.http.post<Response<any>>(`${environment.apisURL}/services/registerUser`,data);
  }
  registerRooms(data: any){
    return this.http.post<Response<any>>(`${environment.apisURL}/services/registerRooms`,data);
  }
  registerReservations(data: any){
    return this.http.post<Response<any>>(`${environment.apisURL}/services/registerReservations`,data);
  }
  getUsers(){
    return this.http.get<Response<UserModel[]>>(`${environment.apisURL}/services/get`);
  }
  getSelectRooms(){
    return this.http.get<Response<SelectModel[]>>(`${environment.apisURL}/services/getSelectRooms`);
  }
  getRoomsDetails(id: any){
    return this.http.get<Response<{detalles: RoomModel, horarios: SheduleModel[]}>>(`${environment.apisURL}/services/getRoomsDetails/${id}`);
  }
  getRooms(){
    return this.http.get<Response<RoomModel[]>>(`${environment.apisURL}/services/getRooms`);
  }
  getReservations(id: any){
    return this.http.get<Response<ReservationModule[]>>(`${environment.apisURL}/services/getReservations/${id}`);
  }
}
