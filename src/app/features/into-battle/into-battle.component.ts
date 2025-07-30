import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MatchService } from '../../core/services/match.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { PlayerService } from '../../core/services/player.service';
import { PlayerResponse } from '../create-player/model/playerResponse.model';
import { SimulateBattleModel } from '../match/model/simulateBattle.model';
import Swal from 'sweetalert2';
import { AlertService } from '../../core/services/alert.service';
import AlertUtil from '../../shared/utils/AlertUtil.util';

@Component({
  selector: 'app-into-battle',
  standalone: true,
  imports: [HeaderComponent, CommonModule, RouterModule],
  templateUrl: './into-battle.component.html',
  styleUrls: ['./into-battle.component.css']
})
export default class IntoBattleComponent implements OnInit {

  matchId!: number;
  playersFounded: PlayerResponse[] = [];
  timer: number = 20;
  isBattleReady: boolean = false;

  constructor(
    private matchService: MatchService,
    private route: ActivatedRoute,
    private playerService: PlayerService,
    private router: Router,
    private alertService:AlertService
  ) {}

  ngOnInit(): void {
    this.matchId = +this.route.snapshot.paramMap.get('matchId')!;
    if (this.matchId) {
      this.findMatchById(this.matchId);
    }
  }

findMatchById(matchId: number): void {
  this.matchService.getMatchById(matchId).subscribe({
    next: (response) => {
      if (response.data.active) {

        const playerObservables = response.data.players!.map(player =>
          this.playerService.getPlayerById(player.playerId)
        );

        forkJoin(playerObservables).subscribe({
          next: (playerResponses) => {
            this.playersFounded = playerResponses.map(res => res.data);

            if (this.playersFounded.length >= 2) {
              this.handleTimer();
            }
          },
          error: (err) => {
            console.error('Error al cargar jugadores:', err);
          }
        });

      } else {
        AlertUtil.success("La partida se encuentra cerrada.").then(() => {this.router.navigate(['/match'])});
      }
    },
    error: (error) => {
      console.error('Error al obtener partida:', error);
    }
  });
}

  simulateBattle() {
    const matchPayload: SimulateBattleModel = {
      matchId: this.matchId,
      playersIds: this.playersFounded.map(player => player.playerId)
    };

    this.matchService.simulateBattle(matchPayload).subscribe({
      next: (response) => {
        this.alertService.fire({
          position: "top-end",
          icon: "info",
          title: `El ganador de la partida fue el jugador ${response.data.winner.nickname}`,
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/match']);
          }
        });
      },
      error: (error) => {
        AlertUtil.error(error.error.message);
      }
    });
  }

  handleTimer() {
    if (this.timer > 0) {
      setTimeout(() => {
        this.timer--;
        this.handleTimer();
      }, 1000);
    } else {
      this.isBattleReady = true;
      this.simulateBattle();
    }
  }
}