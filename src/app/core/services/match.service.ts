import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { MatchModel, MatchResponse } from '../../features/match/model/matchResponse.model';
import { Observable } from 'rxjs';
import { JoinMatchModel } from '../../features/match/model/joinMatch.model';
import { ApiResponse } from '../../shared/models/api-response.model';
import { StorageService } from './storage.service';
import { SimulateBattleModel } from '../../features/match/model/simulateBattle.model';
import { MatchRequest } from '../../features/match/model/matchRequest.model';
import { API_URL } from '../../tokens/api-url.token';
import { ApiPath } from '../../shared/constants/api-paths';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(
    private http: HttpClient, 
    private storageService:StorageService,
    @Inject(API_URL) private apiUrl : string
  ) {}

  getMatches() : Observable<MatchResponse>{
    const jwt = this.storageService.getItem('token');
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${jwt}`
    });
    return this.http.get<MatchResponse>(`${this.apiUrl}${ApiPath.match}`);
  }

  getMatchById(matchId:number) : Observable<ApiResponse<MatchModel>>{
    const jwt = this.storageService.getItem('token');
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${jwt}`
    });
    return this.http.get<ApiResponse<MatchModel>>(`${this.apiUrl}${ApiPath.match}/${matchId}`);
  }

  createMatch(matchPayload: MatchRequest):Observable<ApiResponse<MatchModel>>{
    const jwt = this.storageService.getItem('token');
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${jwt}`
    });
    return this.http.post<ApiResponse<MatchModel>>(`${this.apiUrl}${ApiPath.match}`, matchPayload);
  }

  joinMatch(joinMatchPayload:JoinMatchModel) : Observable<any>{
    const jwt = this.storageService.getItem('token');
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${jwt}`
    });
    return this.http.post<JoinMatchModel>(`${this.apiUrl}${ApiPath.match}/join`, joinMatchPayload);
  }

  simulateBattle(matchPayload:SimulateBattleModel):Observable<ApiResponse<MatchModel>>{
    const jwt = this.storageService.getItem('token');
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${jwt}`
    });
    return this.http.post<ApiResponse<MatchModel>>(`${this.apiUrl}${ApiPath.match}/winner`, matchPayload)
  }

}
