import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MatchModel } from './model/matchResponse.model';
import { MatchService } from '../../core/services/match.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { PlayerService } from '../../core/services/player.service';
import { JoinMatchModel } from './model/joinMatch.model';
import { Router } from '@angular/router';
import { StorageService } from '../../core/services/storage.service';
import { JwtService } from '../../core/services/jwt.service';
import { AlertService } from '../../core/services/alert.service';
import { MatchRequest } from './model/matchRequest.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-match',
  standalone: true,
  imports: [HeaderComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './match.component.html',
  styleUrl: './match.component.css',
})
export default class MatchComponent implements OnInit {
  matches: MatchModel[] = [];
  playerIdFounded?: number;
  role: string = '';
  showModal:boolean=false;
  createMatchForm : FormGroup;

  constructor(
    private matchService: MatchService,
    private playerService: PlayerService,
    private storageService: StorageService,
    private jwtService: JwtService,
    private router: Router,
    private alertService: AlertService,
    private fb : FormBuilder
  ) {
    this.createMatchForm = this.fb.group({
      name: ['', Validators.required],
      createdByUserId: ['']
  });
  }

  ngOnInit(): void {
    this.getMatches();
    this.getPlayerId();
    this.getRole();
  }

  getMatches() {
    this.matchService.getMatches().subscribe({
      next: (response) => {
        this.matches = response.data;
      },
      error: (error) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: error.error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      },
    });
  }

  joinMatch(matchId: number) {
    this.alertService
      .fire({
        title: 'Código de la partida',
        input: 'text',
        inputLabel: 'Ingresa el código de la partida',
        showCancelButton: true,
        confirmButtonText: 'Unirse',
        cancelButtonText: 'Cancelar',
        inputValidator: (value: any) => {
          if (!value) {
            return '¡Debes ingresar un código!';
          }
          return null;
        },
      })
      .then((result) => {
        if (result.isConfirmed) {
          const matchCode = result.value;
          const joinMatchPayload: JoinMatchModel = {
            matchId: matchId,
            playerId: +this.playerIdFounded!,
            matchCode: matchCode,
          };
          this.matchService.joinMatch(joinMatchPayload).subscribe({
            next: (response) => {
              this.alertService
                .fire({
                  position: 'top-end',
                  icon: 'success',
                  title: response.message,
                  showConfirmButton: false,
                  timer: 1500,
                })
                .then(() => {
                  this.router.navigate([`/into-battle/${matchId}`]);
                });
            },
            error: (error) => {
              console.error('Error uniéndose a la partida', error);
              this.alertService.fire({
                position: 'top-end',
                icon: 'error',
                title: error.error.message,
                showConfirmButton: false,
                timer: 2000,
              });
            },
          });
        }
      });
  }

  getPlayerId() {
    const userId = +this.jwtService.getUserIdFromToken();
    if (!userId) {
      return;
    }
    return this.playerService.getPlayerByUserId(userId).subscribe({
      next: (response) => {
        this.playerIdFounded = response.data.playerId;
        console.log(this.playerIdFounded);
      },
      error: (error) => {
        console.error('Error en getPlayerId de match', error);
      },
    });
  }

  getRole() {
    this.role = this.jwtService.getRoleFromToken();
  }

  openModal(){
    this.showModal = true;
  }

  close(){
    this.showModal = false;
  }

  createMatch() {

    const userId = +this.jwtService.getUserIdFromToken();
    if(!userId){
      return;
    }

    this.createMatchForm.patchValue({
      createdByUserId : userId
    })
    const formValue = this.createMatchForm.value;
  
    this.matchService.createMatch(formValue).subscribe({
      next: (response) => {
        this.alertService
          .fire({
            position: 'top-end',
            icon: 'success',
            title: `El código de ingreso de la partida es: ${response.data.code}`,
            showConfirmButton: true,
          })
          .then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
      },
      error: (error) => {
        console.error("Error al crear la partida", error);
        this.alertService.fire({
          position: 'top-end',
          icon: 'error',
          title: error.error.message,
          showConfirmButton: false,
          timer: 2000,
        });
      },
    });
  }
}
