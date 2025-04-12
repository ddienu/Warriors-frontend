import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Warrior } from '../../features/warriors/models/warrior.model';
import { createWarriorDTO } from '../../features/warriors/models/createWarrior.dto';
import { ApiResponse } from '../../shared/models/api-response.model';
import { Observable } from 'rxjs';
import { UpdateWarriorBasicsDTO } from '../../features/warriors/models/updateWarriorBasics.dto';

@Injectable({
  providedIn: 'root'
})
export class WarriorService {

  private apiUrl = "http://localhost:8080/v1/warrior";

  constructor( private http : HttpClient){}

  warriorList() {
    return this.http.get<{data : Warrior[]}>(`${this.apiUrl}`);
  }

  getWarriorById(warriorId : number) : Observable<ApiResponse<Warrior>>{
    return this.http.get<ApiResponse<Warrior>>(`${this.apiUrl}/${warriorId}`)
  }

  createWarrior(newWarrior : createWarriorDTO) : Observable<ApiResponse<createWarriorDTO>>{
    return this.http.post<ApiResponse<createWarriorDTO>>(`${this.apiUrl}`, newWarrior);
  }

  updateWarriorBasics(warriorId : number, warriorUpdated : UpdateWarriorBasicsDTO) : Observable<ApiResponse<UpdateWarriorBasicsDTO>> {
    return this.http.patch<ApiResponse<UpdateWarriorBasicsDTO>>(`${this.apiUrl}/basics/${warriorId}`, warriorUpdated);
  }

  updateWarriorBreed(warriorId: number, breedUpdated : number) : Observable<ApiResponse<Warrior>>{
    return this.http.patch<ApiResponse<Warrior>>(`${this.apiUrl}/breed/${warriorId}`, breedUpdated);
  }

  deleteWarrior(warriorId : number) : Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${warriorId}`);
  }
}
