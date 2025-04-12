import { Component, inject, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { WarriorService } from '../../../core/services/warrior.service';
import { RouterModule } from '@angular/router';
import { Warrior } from '../models/warrior.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-warriors',
  standalone: true,
  imports: [
    CommonModule, HttpClientModule, RouterModule, ReactiveFormsModule
  ],
  templateUrl: './warriors.component.html',
  styleUrl: './warriors.component.css'
})
export default class WarriorsComponent implements OnInit{
  
  warriors: Warrior[] = [];

  constructor( private warriorService : WarriorService){}

  
  ngOnInit(): void {
    this.loadAllWarrior();
  } 

  loadAllWarrior(){
    this.warriorService.warriorList().subscribe({
      next: (response) => {
        console.log(response.data)
        this.warriors = response.data;
      },
      error: (error) => {
        console.error('Error loading warriors', error);
      }
    });
  }

  deleteWarrior(warriorId : number) : void {
    this.warriorService.deleteWarrior(warriorId).subscribe( () => {
      this.loadAllWarrior();
    })
  }

}
