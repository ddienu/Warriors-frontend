import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

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

    getRoleFromToken(){
        const jwt = localStorage.getItem('token');
        if(jwt){
            const jwtDecoded = jwtDecode<TokenModel>(jwt);
            return jwtDecoded.role;
        }
        return "";
    }

}
