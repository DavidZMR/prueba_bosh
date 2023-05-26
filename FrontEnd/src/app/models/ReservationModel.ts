import { SheduleModel } from "./ScheduleModel";

export interface ReservationModule{
    capacidad: number;
    descripcion: string;
    horarios: SheduleModel[];
    idSala: number;
    idreservacion: number;
    sala: string;
}
