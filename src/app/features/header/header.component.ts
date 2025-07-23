import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { JwtService } from '../../core/services/jwt.service';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { StorageService } from '../../core/services/storage.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  isMenuOpen: boolean = false;
  role: string = "";

  constructor(private jwtService: JwtService, private router:Router, private storageService:StorageService) { }

  ngOnInit(): void {
    this.role = this.jwtService.getRoleFromToken();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    Swal.fire({
      title: "¿Desea cerrar sesión?",
      icon: "question",
      iconHtml: "?",
      confirmButtonText: "Si",
      cancelButtonText: "No",
      showCancelButton: true,
      showCloseButton: true
    }).then((result) => {
      if(result.isConfirmed){
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Cerrando sesión...",
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          const path = window.location.pathname;
          path === "/" ? window.location.reload() : this.router.navigate([''])
        });
        this.storageService.clear();
      }
    });
  }

}
