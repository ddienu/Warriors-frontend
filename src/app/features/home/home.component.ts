import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Router, RouterModule } from '@angular/router';
import { JwtService } from '../../core/services/jwt.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export default class HomeComponent implements OnInit{

  constructor(private jwtService: JwtService, private router:Router){}

  ngOnInit(): void {
   
   if(this.validateIfTokenExpired()){
    this.router.navigate(['/auth']);
    localStorage.clear();
   }
  }

  validateIfTokenExpired():boolean{
    const isTokenExpired = this.jwtService.validateIfTokenExpired();
    return isTokenExpired!;
  }

}
