import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../../shared/models/api-response.model';
import { TypeWarrior } from '../../features/typeWarrior/models/typeWarrior.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeWarriorService {

  private apiUrl = "http://localhost:8080/v1/typeWarrior";

  constructor(private http : HttpClient) { }

  getTypeWarriors() : Observable<ApiResponse<TypeWarrior[]>> {
    return this.http.get<ApiResponse<TypeWarrior[]>>(`${this.apiUrl}`);
  }
}
