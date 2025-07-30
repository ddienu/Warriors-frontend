import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import AlertUtil from '../../shared/utils/AlertUtil.util';


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
    private router: Router
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
        AlertUtil.success("Iniciando sesión...").then( () => {this.router.navigate([''])});
        localStorage.setItem('token', response.data.token);
      },
      error: (error) => {
        console.error("Error login user", error);
        if(error.status === 401){
          AlertUtil.error("Credenciales incorrectas. Por favor, validar.")
          return;
        }
        AlertUtil.error("Error ingresando a la aplicación");
      }
    })
  }

  goToRegister() {
      this.isRegisterForm = true;
      this.registerForm.reset();
      this.loginForm.reset();
  }

  register(){
    const registerFormValue = this.registerForm.value;
    this.authService.register(registerFormValue).subscribe({
      next: () => {
        AlertUtil.success("Registro exitoso.").then(() => {this.isRegisterForm = false});
      }, 
      error: (error) => {
        console.error("Error registering new user", error);
        AlertUtil.error("Error al registrar el nuevo usuario");
      }
    })
  }

  goToLogin(){
      this.isRegisterForm = false;
      this.registerForm.reset();
      this.loginForm.reset();
  }

}
