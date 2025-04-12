import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Power } from '../../features/powers/models/power.model';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../shared/models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class PowerService {

  private apiUrl = "http://localhost:8080/v1/typePower"

  constructor(private http : HttpClient){}

  getPowers() : Observable<ApiResponse<Power[]>> {
    return this.http.get<ApiResponse<Power[]>>(`${this.apiUrl}`);
  }

}
