import { Component, OnInit } from '@angular/core';
import { WarriorService } from '../../../core/services/warrior.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Warrior } from '../models/warrior.model';

@Component({
  selector: 'app-edit-basics',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-basics.component.html',
  styleUrl: './edit-basics.component.css'
})
export default class EditBasicsComponent implements OnInit{

  public warriorUpdated : FormGroup;
  private warriorId! : number;

  constructor(private warriorService : WarriorService, private route : ActivatedRoute, private fb : FormBuilder){
    this.warriorUpdated = this.fb.group({
      warriorName : ['', Validators.required],
      warriorLife : [0, [Validators.required, Validators.min(1)]],
      warriorEnergy : [0, [Validators.required, Validators.min(1)]]
    })
  }
  ngOnInit(): void {
    const warriorId = this.route.snapshot.paramMap.get('id');
    if( warriorId ){
      this.loadWarrior(+warriorId);
    }
  }

  loadWarrior(warriorId : number) : void {
    this.warriorService.getWarriorById(warriorId).subscribe( (response) => {
      this.patchForm(response.data);
    })
  }

  patchForm(warrior : Warrior) {
    this.warriorUpdated.patchValue({
      warriorName : warrior.warriorName,
      warriorLife : warrior.warriorLife,
      warriorEnergy : warrior.warriorEnergy
    })
  }
  
  updateWarriorBasics() : void {

    const warriorId = +this.route.snapshot.paramMap.get('id')!;
    if (this.warriorUpdated.valid) {
      const data = this.warriorUpdated.value;
      this.warriorService.updateWarriorBasics(warriorId, data).subscribe({
        next: (res) => {
          // Puedes mostrar una alerta o redireccionar
          console.log('Guerrero actualizado', res);
        },
        error: (err) => {
          console.error('Error actualizando guerrero', err);
        }
      });
    } else {
      this.warriorUpdated.markAllAsTouched();
    }
  }

}
