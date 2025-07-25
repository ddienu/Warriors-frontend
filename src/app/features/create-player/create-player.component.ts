import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import WarriorsComponent from '../warriors/warriors-list/warriors.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JwtService } from '../../core/services/jwt.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PlayerService } from '../../core/services/player.service';
import { CreatePlayer } from './model/createPlayer.model';
import Swal from 'sweetalert2';
import { PlayerResponse, Warrior } from './model/playerResponse.model';
import { AlertService } from '../../core/services/alert.service';

@Component({
  selector: 'app-create-player',
  standalone: true,
  imports: [HeaderComponent, WarriorsComponent, ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './create-player.component.html',
  styleUrl: './create-player.component.css'
})
export default class CreatePlayerComponent implements OnInit {

  createPlayerForm:FormGroup;
  selectedWarriorIds:number[]=[];
  isPlayerRegistered:boolean=false;
  playerFounded: PlayerResponse | null = null;
  
  constructor(
    private fb: FormBuilder,
    private playerService: PlayerService,
    private jwtService: JwtService,
    private router: Router,
    private alertService: AlertService
  ) {
    this.createPlayerForm = this.fb.group({
      nickname: ['', [Validators.required, Validators.minLength(3)]],
    });
  }
  ngOnInit(): void {
    const userId = +this.jwtService.getUserIdFromToken();
    if(!userId){
      return;
    }
    this.playerService.getPlayerByUserId(userId).subscribe({
      next: (response) => {
        this.isPlayerRegistered = true
        this.playerFounded = response.data;
        console.log(this.playerFounded);
        console.log(this.isPlayerRegistered);
        // console.log(this.playerFounded);
      },
      error: (error) => {
        console.error(error);
        this.isPlayerRegistered = false;
      }
    })
  }

  // Recibe los ids desde el componente <app-warriors>
  onWarriorSelectionChanged(ids: number[]) {
    this.selectedWarriorIds = ids;
  }

  // Enviar datos al backend
  submit() {
    if (this.createPlayerForm.invalid || this.selectedWarriorIds.length !== 5) {
        this.alertService.fire({
          position: "top-end",
          icon: "error",
          title: 'Selecciona 5 guerreros y un nickname válido',
          showConfirmButton: false,
          timer: 2200
        });
      return;
    }
    
    const userIdFromToken = +this.jwtService.getUserIdFromToken();

    const request : CreatePlayer = {
      nickname: this.createPlayerForm.value.nickname,
      warriorsIdSelected: this.selectedWarriorIds,
      userId: userIdFromToken
    };

    this.playerService.createPlayer(request).subscribe({
      next: (response) => {
        console.log(response);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: response.message,
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          window.location.reload();
        });
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: err.error.message,
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }

  //Method that verifies if the userId saved on the token has a player already
  loadPlayerIfExists() {
    // return this.playerService.getPlayerByUserId().subscribe({
    //   next: (response) => {
    //     this.playerFounded = response['data']
    //     console.log(this.playerFounded);
    //   },
    //   error: (error) => {
    //     console.error(error);
    //     this.playerFounded = undefined;
    //   }
    // })
  }

  showAlert(){
    alert("Entrando");
  }
}

