import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ApiResponse } from '../../shared/models/api-response.model';
import { Breed } from '../../features/breedWarrior/models/breed.model';
import { Observable } from 'rxjs';
import { API_URL } from '../../tokens/api-url.token';
import { ApiPath } from '../../shared/constants/api-paths';

@Injectable({
  providedIn: 'root'
})
export class BreedService {

  constructor( 
    private http : HttpClient,
    @Inject(API_URL) private apiUrl : string
  ) {}

  getBreeds() : Observable<ApiResponse<Breed[]>> {
    return this.http.get<ApiResponse<Breed[]>>(`${this.apiUrl}${ApiPath.breed}`);
  }
}
