import { Component, OnInit } from '@angular/core';
import { Power } from '../../powers/models/power.model';
import { PowerService } from '../../../core/services/power.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { WarriorService } from '../../../core/services/warrior.service';
import { HeaderComponent } from '../../header/header.component';
import AlertUtil from '../../../shared/utils/AlertUtil.util';

@Component({
  selector: 'app-edit-powers',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent],
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
    private route: ActivatedRoute,
    private router: Router
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
        });
      });
    };
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
      this.warriorService.updateWarriorPowers(this.warriorId, data).subscribe({
        next: (response) => {
          if(response.message.includes("successfully")){
            AlertUtil.success("Poderes actualizados correctamente.").then(() => {this.router.navigate(['/warriors'])});
          }
        },
        error: (error) => {
          console.error('Error updating warrior powers', error);
          if(error.error.message.includes("five powers")){
            AlertUtil.error(`${data.powerIds.length} de 5 poderes seleccionados. Debes elegir 5.`);
            return;
          };
          AlertUtil.error("Opps! Error actualizando los poderes del guerrero");
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
