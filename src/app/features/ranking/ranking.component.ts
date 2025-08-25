import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Player } from '../players/model/player.model';
import { PlayerService } from '../../core/services/player.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PlayerResponse } from '../create-player/model/playerResponse.model';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.css'
})
export default class RankingComponent implements OnInit{

  players : PlayerResponse[] = [];
  currentPage: number = 0;
  totalPages: number = 0;
  pageSize: number = 10;

  constructor(
    private playerService : PlayerService,
    private router : Router,
    private route : ActivatedRoute
  ){}


  ngOnInit(): void {
    this.route.queryParams.subscribe( params => {
      this.currentPage = params['page'] ? +params['page'] : this.currentPage;
      this.pageSize = params['size'] ? +params['size'] : this.pageSize;
    });
    this.getPlayersOrderByPoints();
  }



  getPlayersOrderByPoints(){
    this.playerService.getPlayersOrderByPoints({size: this.pageSize, page: this.currentPage}).subscribe({
      next: ( response ) => {
        this.players = response.data.content;
        this.currentPage = response.data.pageNumber;
        this.totalPages = response.data.totalPages;
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {
            page: this.currentPage,
            size: this.pageSize
          }
        })
      },
      error: (error) => {
        console.error("Error retrieving players order by points", error);
      }
    })
  }

    goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      console.log(this.currentPage);
      this.getPlayersOrderByPoints();
    }
  }

}
