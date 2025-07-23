import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreatePlayer } from '../../features/create-player/model/createPlayer.model';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../shared/models/api-response.model';
import { PlayerResponse } from '../../features/create-player/model/playerResponse.model';
import { JwtService } from './jwt.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private apiUrl = "http://localhost:8080/v1/player"

  constructor(private http:HttpClient, private jwtService:JwtService, private storageService:StorageService) { }

  getPlayerById(playerId:number):Observable<ApiResponse<PlayerResponse>>{
    return this.http.get<ApiResponse<PlayerResponse>>(`${this.apiUrl}/${playerId}`);
  }
  
  getPlayerByUserId(userId : number) : Observable<ApiResponse<PlayerResponse>>{
    // const userId = this.jwtService.getUserIdFromToken();

    return this.http.get<ApiResponse<PlayerResponse>>(`${this.apiUrl}/user/${userId}`)
  }

  createPlayer(playerPayload : CreatePlayer) : Observable<ApiResponse<CreatePlayer>>{
    return this.http.post<ApiResponse<CreatePlayer>>(`${this.apiUrl}`, playerPayload);
  }
}
