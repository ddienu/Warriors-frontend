import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { StorageService } from './storage.service';

export interface TokenModel{
    sub: string,
    email: string,
    role: string,
    iat: Date,
    exp: Date
}


@Injectable({
  providedIn: 'root'
})
export class JwtService {

    constructor(private storageService:StorageService){}

    getRoleFromToken(){
        const jwt = this.storageService.getItem('token');
        if(jwt){
            const jwtDecoded = jwtDecode<TokenModel>(jwt);
            return jwtDecoded.role;
        }
        return "";
    }

    getUserIdFromToken(){
        const jwt = this.storageService.getItem('token');
        if(jwt){
            const jwtDecoded = jwtDecode<TokenModel>(jwt);
            return jwtDecoded.sub;
        };
        return "";
    }

    validateIfTokenExpired(){
        const jwt = this.storageService.getItem('token');
        let expirationDate;
        if(jwt){
            const jwtDecoded = jwtDecode<TokenModel>(jwt);
            expirationDate=new Date(+jwtDecoded.exp*1000);
            if(expirationDate.getTime() >= Date.now()){
                return false;
            }else{
                return true;
            }
        }
        return null;
    }
}
