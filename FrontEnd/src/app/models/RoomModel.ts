import { SheduleModel } from "./ScheduleModel";

export interface RoomModel{
    idsala: number;
    capacidad: number;
    nombre: string;
    horarios?: SheduleModel[]
}