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
import { Player } from '../../features/players/model/player.model';
import { Page } from '../../shared/models/page.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(
    private http: HttpClient,
    private jwtService: JwtService,
    private storageService: StorageService,
    @Inject(API_URL) private apiUrl: string
  ) { }

  getPlayers(options?: { page?: number; size?: number; nickname?: string }): Observable<ApiResponse<Page<Player>>> {
    const params: any = {};

    if (options?.nickname) params.nickname = options.nickname;
    if (options?.page !== undefined) params.page = options.page;
    if (options?.size !== undefined) params.size = options.size;

    return this.http.get<ApiResponse<Page<Player>>>(`${this.apiUrl}${ApiPath.player}`, { params });
  }

  getPlayerById(playerId: number): Observable<ApiResponse<PlayerResponse>> {
    return this.http.get<ApiResponse<PlayerResponse>>(`${this.apiUrl}${ApiPath.player}/${playerId}`);
  }

  getPlayerByUserId(userId: number): Observable<ApiResponse<PlayerResponse>> {
    // const userId = this.jwtService.getUserIdFromToken();

    return this.http.get<ApiResponse<PlayerResponse>>(`${this.apiUrl}${ApiPath.player}/user/${userId}`);
  }

  getPlayersOrderByPoints(options?: { page?: number; size?: number;}) : Observable<ApiResponse<Page<PlayerResponse>>>{
    const params : any = {};

    params.page = options?.page !== undefined ? options.page : 0
    params.size = options?.size !== undefined ? options.size : 10

    return this.http.get<ApiResponse<Page<PlayerResponse>>>(`${this.apiUrl}${ApiPath.player}/points`, {params});
  }

  createPlayer(playerPayload: CreatePlayer): Observable<ApiResponse<CreatePlayer>> {
    return this.http.post<ApiResponse<CreatePlayer>>(`${this.apiUrl}${ApiPath.player}`, playerPayload);
  }

  editPlayer(playerId: number, playerEditedPayload: CreatePlayer): Observable<ApiResponse<CreatePlayer>> {
    return this.http.put<ApiResponse<CreatePlayer>>(`${this.apiUrl}${ApiPath.player}/${playerId}`, playerEditedPayload);
  }

  deletePlayer(playerId: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}${ApiPath.player}/${playerId}`);
  }
}
