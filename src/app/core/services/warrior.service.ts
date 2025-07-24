import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { Warrior } from '../../features/warriors/models/warrior.model';
import { createWarriorDTO } from '../../features/warriors/models/createWarrior.dto';
import { ApiResponse } from '../../shared/models/api-response.model';
import { Observable } from 'rxjs';
import { UpdateWarriorBasicsDTO } from '../../features/warriors/models/updateWarriorBasics.dto';
import { UpdateWarriorPowersDTO } from '../../features/warriors/models/updateWarriorPowers.dto';
import { API_URL } from '../../tokens/api-url.token';
import { ApiPath } from '../../shared/constants/api-paths';

@Injectable({
  providedIn: 'root'
})
export class WarriorService {

  constructor( 
    private http : HttpClient,
    @Inject(API_URL) private apiUrl : string
  ){}

  warriorList() {
    return this.http.get<{data : Warrior[]}>(`${this.apiUrl}${ApiPath.warrior}`);
  }

  getWarriorById(warriorId : number) : Observable<ApiResponse<Warrior>>{
    return this.http.get<ApiResponse<Warrior>>(`${this.apiUrl}${ApiPath.warrior}/${warriorId}`)
  }

  createWarrior(newWarrior : createWarriorDTO) : Observable<ApiResponse<createWarriorDTO>>{
    return this.http.post<ApiResponse<createWarriorDTO>>(`${this.apiUrl}${ApiPath.warrior}`, newWarrior);
  }

  updateWarriorBasics(warriorId : number, warriorUpdated : UpdateWarriorBasicsDTO) : Observable<ApiResponse<UpdateWarriorBasicsDTO>> {
    return this.http.patch<ApiResponse<UpdateWarriorBasicsDTO>>(`${this.apiUrl}${ApiPath.warrior}/basics/${warriorId}`, warriorUpdated);
  }

  updateWarriorBreed(warriorId: number, breedUpdated : number) : Observable<ApiResponse<Warrior>>{
    return this.http.patch<ApiResponse<Warrior>>(`${this.apiUrl}${ApiPath.warrior}/breed/${warriorId}`, breedUpdated);
  }

  updateWarriorPowers(warriorId: number, powersUpdated : UpdateWarriorPowersDTO) : Observable<ApiResponse<Warrior>>{
    return this.http.patch<ApiResponse<Warrior>>(`${this.apiUrl}${ApiPath.warrior}/powers/${warriorId}`, powersUpdated);
  }

  updateWarriorType(warriorId : number, typeUpdated : number) : Observable<ApiResponse<Warrior>>{
    return this.http.patch<ApiResponse<Warrior>>(`${this.apiUrl}${ApiPath.warrior}/type/${warriorId}`, typeUpdated);
  }

  deleteWarrior(warriorId : number) : Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}${ApiPath.warrior}/${warriorId}`);
  }
}
