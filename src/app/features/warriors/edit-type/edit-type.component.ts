import { Component, OnInit } from '@angular/core';
import { WarriorService } from '../../../core/services/warrior.service';
import { TypeWarriorService } from '../../../core/services/type-warrior.service';
import { TypeWarrior } from '../../typeWarrior/models/typeWarrior.model';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-edit-type',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent],
  templateUrl: './edit-type.component.html',
  styleUrl: './edit-type.component.css'
})
export default class EditTypeComponent implements OnInit{

  typeWarriorList : TypeWarrior[] = [];
  typeWarriorForm : FormGroup;
  warriorId! : number;

  constructor(private warriorService : WarriorService, 
    private typeWarriorService : TypeWarriorService, 
    private fb : FormBuilder,
    private route : ActivatedRoute) {
    this.typeWarriorForm = fb.group({
      typeWarriorId : [0, [Validators.required, Validators.min(1)]]
    })

  }
  ngOnInit(): void {
    this.getAllTypeWarriors();
    this.warriorId = +this.route.snapshot.paramMap.get('id')!;
    if( this.warriorId){
      this.warriorService.getWarriorById(+this.warriorId).subscribe( (response) => {
        const warrior = response.data;
        this.typeWarriorForm.patchValue({
          typeWarriorId : warrior.warriorType.typeWarriorId
        })
      })
    }
  }

  getAllTypeWarriors() : void{
    this.typeWarriorService.getTypeWarriors().subscribe({
      next: (response) => {
        this.typeWarriorList = response.data;
      },
      error: (error) => {
        console.error('Error loading type warrior list', error)
      }
    })
  }

  updateTypeWarrior() : void {
    if( this.typeWarriorForm.valid){
      const data = this.typeWarriorForm.value;
      this.warriorService.updateWarriorType(this.warriorId, data).subscribe({
        next : (response) => {
          console.log(response.message)
        },
        error : (error) => {
          console.error('Error updating type warrior', error)
        }
      })
    }
  }

  selectType(typeWarriorId : number) : void{
    this.typeWarriorForm.get('typeWarriorId')?.setValue(typeWarriorId);
  }



}
