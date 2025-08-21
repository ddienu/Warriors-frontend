import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Player } from './model/player.model';
import { PlayerService } from '../../core/services/player.service';
import AlertUtil from '../../shared/utils/AlertUtil.util';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [HeaderComponent, RouterModule, CommonModule, FormsModule],
  templateUrl: './players.component.html',
  styleUrl: './players.component.css'
})
export default class PlayersComponent implements OnInit {

  players: Player[] = [];
  openModal: Boolean = false;
  nickname: string = "";
  currentPage: number = 0;
  totalPages: number = 0;
  pageSize: number = 10;
  lastSearch :string = "";

  constructor(
    private playerService: PlayerService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const search = params['nickname'] || "";
      this.nickname = search;
      this.getPlayers();
    });
  }

  getPlayers() {
    const params: any = {};

    if (this.nickname && this.nickname.trim() !== "") {
      params.nickname = this.nickname;
    }

    if(this.nickname !== this.lastSearch){
      this.currentPage = 0;
    }
  
    this.playerService.getPlayers({size: this.pageSize, page: this.currentPage, nickname: params.nickname}).subscribe({
      next: (response) => {
        if (response.data.content.length === 0) {
          AlertUtil.info("Oops, nada que mostrar!").then(() => {
            this.clearSearch();
          });
          return;
        }
        this.currentPage = response.data.pageNumber;
        this.totalPages = response.data.totalPages
        this.players = response.data.content;

        this.lastSearch = this.nickname;

        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { nickname: this.nickname || null }
        });
      },
      error: (error) => {
        console.error("Error retrieving players", error);
      }
    });
  }

  clearSearch() {
    this.nickname = "";
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {}
    });
  }


  showModal() {
    this.openModal = true;
  }

  closeModal() {
    this.openModal = false;
  }

  deletePlayer(playerId: number) {
    AlertUtil.confirm("¿Está seguro que desea eliminar al jugador?").then(
      (response) => {
        if (response.isConfirmed) {
          this.playerService.deletePlayer(playerId).subscribe({
            next: () => {
              AlertUtil.success("El jugador ha sido eliminado satisfactoriamente").then(
                () => {
                  this.getPlayers();
                }
              )
            },
            error: (error) => {
              console.error("Error erasing player", error);
              AlertUtil.error(error.error.message);
            }
          })
        }
      }
    )
  }

  goToPage(page: number): void {
    console.log(page);
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.getPlayers();
    }
  }
}
