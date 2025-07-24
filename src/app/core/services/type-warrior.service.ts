import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ApiResponse } from '../../shared/models/api-response.model';
import { TypeWarrior } from '../../features/typeWarrior/models/typeWarrior.model';
import { Observable } from 'rxjs';
import { API_URL } from '../../tokens/api-url.token';
import { ApiPath } from '../../shared/constants/api-paths';

@Injectable({
  providedIn: 'root'
})
export class TypeWarriorService {

    constructor(
    private http : HttpClient,
    @Inject(API_URL) private apiUrl : string
  ) { }

  getTypeWarriors() : Observable<ApiResponse<TypeWarrior[]>> {
    return this.http.get<ApiResponse<TypeWarrior[]>>(`${this.apiUrl}${ApiPath.typeWarrior}`);
  }
}
