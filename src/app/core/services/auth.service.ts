import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { LoginResponse } from '../../features/auth/model/loginResponse.model';
import { AuthModelRequest } from '../../features/auth/model/auth.model';
import { API_URL } from '../../tokens/api-url.token';
import { ApiPath } from '../../shared/constants/api-paths';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    @Inject(API_URL) private apiUrl : string
  ) { }

  register(registerPayload : AuthModelRequest) : Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.apiUrl}${ApiPath.auth}/register`, registerPayload);
  }

  login(loginPayload : AuthModelRequest) : Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.apiUrl}${ApiPath.auth}/login`, loginPayload);
  }
}
