import { Component, OnInit } from '@angular/core';
import { Power } from '../../powers/models/power.model';
import { PowerService } from '../../../core/services/power.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { WarriorService } from '../../../core/services/warrior.service';

@Component({
  selector: 'app-edit-powers',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-powers.component.html',
  styleUrl: './edit-powers.component.css'
})
export default class EditPowersComponent implements OnInit{

  powers: Power[] = [];
  updateWarriorPowersForm: FormGroup;
  warriorId!: number;

  constructor(
    private powerService: PowerService,
    private warriorService: WarriorService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ){
    this.updateWarriorPowersForm = fb.group({
      powerIds : [[]]
    })
  };


  ngOnInit(): void {
    this.getAllPowers();
    this.warriorId = +this.route.snapshot.paramMap.get('id')!;
    if (this.warriorId) {
      this.warriorService.getWarriorById(+this.warriorId).subscribe((response) => {
        const warrior = response.data;
        this.updateWarriorPowersForm.patchValue({
          powerIds: Array.isArray(warrior.powers)
          ? warrior.powers.map(p => p.powerId)
          : []
        })
        console.log(this.updateWarriorPowersForm.value.powerIds)
      })
    }
  }

  getAllPowers() : void {
    this.powerService.getPowers().subscribe({
      next: (response) => {
        this.powers = response.data;
      },
      error: (error) => {
        console.error('Error loading warrior\'s powers', error);
      }
    })
  }

  updateWarriorPowers() : void {
    if(this.updateWarriorPowersForm.valid){
      const data = this.updateWarriorPowersForm.value;
      console.log(data);
      this.warriorService.updateWarriorPowers(this.warriorId, data).subscribe({
        next: (response) => {
          console.log(response)
        },
        error: (error) => {
          console.error('Error updating warrior powers', error)
        }
      })
    }
  }

selectPowers(powerId: number): void {
  const current: number[] = this.updateWarriorPowersForm.get('powerIds')?.value || [];

  const updated = current.includes(powerId)
    ? current.filter(id => id !== powerId)  
    : [...current, powerId];               

  this.updateWarriorPowersForm.patchValue({
    powerIds: updated
  });
}

}
