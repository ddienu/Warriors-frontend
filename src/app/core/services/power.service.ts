import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { Power } from '../../features/powers/models/power.model';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../shared/models/api-response.model';
import { API_URL } from '../../tokens/api-url.token';
import { ApiPath } from '../../shared/constants/api-paths';

@Injectable({
  providedIn: 'root'
})
export class PowerService {

  constructor(
    private http : HttpClient,
    @Inject(API_URL) private apiUrl : string
  ){}

  getPowers() : Observable<ApiResponse<Power[]>> {
    return this.http.get<ApiResponse<Power[]>>(`${this.apiUrl}${ApiPath.typePower}`);
  }

}
