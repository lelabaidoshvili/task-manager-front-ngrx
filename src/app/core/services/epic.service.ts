import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {Observable} from "rxjs";
import {EpicResponse} from "../interfaces/epic.interface";

@Injectable({
  providedIn: 'root'
})
export class EpicService extends BaseService{

  createEpic(payload: EpicResponse): Observable<EpicResponse> {
    return this.post<EpicResponse>('epics', payload);
  }

  getEpics(): Observable<EpicResponse[]> {
    return this.get<EpicResponse[]>('epics');
  }

  getEpic(id: number): Observable<EpicResponse> {
    return this.get<EpicResponse>(`epics/${id}`);
  }


  updateEpic(payload: EpicResponse): Observable<EpicResponse> {
    return this.put<EpicResponse>(`epics/${payload.id}`, payload);
  }

  deleteEpic(id: number): Observable<any> {
    return this.delete(`epics/${id}`);
  }

}
