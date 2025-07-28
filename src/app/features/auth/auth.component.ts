import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../core/services/alert.service';


@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export default class AuthComponent {

  isRegisterForm: boolean = false;
  loginForm: FormGroup
  registerForm: FormGroup

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private alert: AlertService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    }),
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }


  login() {
    const loginFormValue = this.loginForm.value;
    this.authService.login(loginFormValue).subscribe({
      next: (response) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: response.message,
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.router.navigate(['']);
        });
        localStorage.setItem('token', response.data.token);
      },
      error: (error) => {
          Swal.fire({
          position: "top-end",
          icon: "error",
          title: error.error.message,
          showConfirmButton: false,
          timer: 1500
        });
      }
    })
  }

  goToRegister() {
      this.isRegisterForm = true;
  }

  register(){
    const registerFormValue = this.registerForm.value;
    this.authService.register(registerFormValue).subscribe({
      next: (response) => {
        this.alert.fire({
          position: "top-end",
          icon: "success",
          title: response.message,
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.isRegisterForm = false;
        })
      }, 
      error: (error) => {
        this.alert.fire({
          position: 'top-end',
          icon: 'error',
          title: error.error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    })
  }

  goToLogin(){
      this.isRegisterForm = false
  }

}
