import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../../shared/models/api-response.model';
import { Breed } from '../../features/breedWarrior/models/breed.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreedService {

  private apiUrl = "http://localhost:8080/v1/breedWarrior"

  constructor( private http : HttpClient) {}

  getBreeds() : Observable<ApiResponse<Breed[]>> {
    return this.http.get<ApiResponse<Breed[]>>(`${this.apiUrl}`);
  }
}
