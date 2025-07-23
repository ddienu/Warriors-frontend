import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { LoginResponse } from '../../features/auth/model/loginResponse.model';
import { AuthModelRequest } from '../../features/auth/model/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = "http://localhost:8080/v1/auth";

  constructor(private http: HttpClient) { }

  register(registerPayload : AuthModelRequest) : Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.apiUrl}/register`, registerPayload);
  }

  login(loginPayload : AuthModelRequest) : Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this,this.apiUrl}/login`, loginPayload);
  }
}
