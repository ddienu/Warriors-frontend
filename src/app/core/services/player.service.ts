import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CreatePlayer } from '../../features/create-player/model/createPlayer.model';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../shared/models/api-response.model';
import { PlayerResponse } from '../../features/create-player/model/playerResponse.model';
import { JwtService } from './jwt.service';
import { StorageService } from './storage.service';
import { API_URL } from '../../tokens/api-url.token';
import { ApiPath } from '../../shared/constants/api-paths';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(
    private http:HttpClient, 
    private jwtService:JwtService, 
    private storageService:StorageService,
    @Inject(API_URL) private apiUrl : string
  ) {}

  getPlayerById(playerId:number):Observable<ApiResponse<PlayerResponse>>{
    return this.http.get<ApiResponse<PlayerResponse>>(`${this.apiUrl}${ApiPath.player}/${playerId}`);
  }
  
  getPlayerByUserId(userId : number) : Observable<ApiResponse<PlayerResponse>>{
    // const userId = this.jwtService.getUserIdFromToken();

    return this.http.get<ApiResponse<PlayerResponse>>(`${this.apiUrl}${ApiPath.player}/user/${userId}`)
  }

  createPlayer(playerPayload : CreatePlayer) : Observable<ApiResponse<CreatePlayer>>{
    return this.http.post<ApiResponse<CreatePlayer>>(`${this.apiUrl}${ApiPath.player}`, playerPayload);
  }

  editPlayer(playerId : number, playerEditedPayload : CreatePlayer) : Observable<ApiResponse<CreatePlayer>>{
    return this.http.put<ApiResponse<CreatePlayer>>(`${this.apiUrl}${ApiPath.player}/${playerId}`, playerEditedPayload);
  }
}
