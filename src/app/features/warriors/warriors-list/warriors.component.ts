import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { WarriorService } from '../../../core/services/warrior.service';
import { RouterModule } from '@angular/router';
import { Warrior } from '../models/warrior.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from '../../header/header.component';
import { JwtService } from '../../../core/services/jwt.service';

@Component({
  selector: 'app-warriors',
  standalone: true,
  imports: [
    CommonModule, HttpClientModule, RouterModule, ReactiveFormsModule, HeaderComponent
  ],
  templateUrl: './warriors.component.html',
  styleUrl: './warriors.component.css'
})
export default class WarriorsComponent implements OnInit {

  warriors: Warrior[] = [];
  role: string = "";
  selectedWarriorIds: number[] = [];
  currentPage:number=0;
  totalPages:number=0;
  pageSize:number=8;
  @Input() paddingWarriors : string = "p-8"
  @Input() showTitle : boolean = true;
  @Input() marginTop : string = "mt-24";
  @Input() showHeader: boolean = true;
  @Input() selectionMode: boolean = false;
  @Input() maxSelectable: number = 0;
  @Output() selectionChange = new EventEmitter<number[]>();
  // Output to emit the event to parent from the children component
  @Output() createPlayerButton = new EventEmitter<void>();


  constructor(private warriorService: WarriorService, private jwtService: JwtService) { }


  ngOnInit(): void {
    this.role = this.jwtService.getRoleFromToken();
    this.loadAllWarrior();
  }

  loadAllWarrior() {
    this.warriorService.warriorList(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        // console.log(response.data.content)
        this.warriors = response.data.content;
        this.currentPage = response.data.number;
        this.totalPages = response.data.totalPages
        // console.log(this.currentPage, this.totalPages);>

      },
      error: (error) => {
        console.error('Error loading warriors', error);
      }
    });
  }

  deleteWarrior(warriorId: number): void {
    this.warriorService.deleteWarrior(warriorId).subscribe(() => {
      this.loadAllWarrior();
    })
  }

  toggleSelection(id: number) {
    const alreadySelected = this.selectedWarriorIds.includes(id);

    if (!alreadySelected && this.maxSelectable && this.selectedWarriorIds.length >= this.maxSelectable) {
      return; // No permitir seleccionar más de 5
    }

    if (alreadySelected) {
      this.selectedWarriorIds = this.selectedWarriorIds.filter(w => w !== id);
    } else {
      this.selectedWarriorIds.push(id);
    }

    this.selectionChange.emit(this.selectedWarriorIds);
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadAllWarrior();
    }
  }

  onCreatePlayer(){
    this.createPlayerButton.emit();
  }
}
