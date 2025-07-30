import { Component, OnInit } from '@angular/core';
import { WarriorService } from '../../../core/services/warrior.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Warrior } from '../models/warrior.model';
import { HeaderComponent } from '../../header/header.component';
import { AlertService } from '../../../core/services/alert.service';
import AlertUtil from '../../../shared/utils/AlertUtil.util';

@Component({
  selector: 'app-edit-basics',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderComponent],
  templateUrl: './edit-basics.component.html',
  styleUrl: './edit-basics.component.css'
})
export default class EditBasicsComponent implements OnInit{

  public warriorUpdated : FormGroup;
  private warriorId! : number;

  constructor(
    private warriorService : WarriorService, 
    private route : ActivatedRoute, 
    private fb : FormBuilder,
    private alertService : AlertService,
    private router : Router
  ){
    this.warriorUpdated = this.fb.group({
      warriorName : ['', Validators.required],
      warriorLife : [0, [Validators.required, Validators.min(1)]],
      warriorEnergy : [0, [Validators.required, Validators.min(1)]]
    })
  }
  ngOnInit(): void {
    this.warriorId = +this.route.snapshot.paramMap.get('id')!;
    if( this.warriorId ){
      this.loadWarrior(this.warriorId);
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

    if (this.warriorUpdated.valid) {
      const data = this.warriorUpdated.value;
      this.warriorService.updateWarriorBasics(this.warriorId, data).subscribe({
        next: () => {
          AlertUtil.success("Guerrero actualizado satisfactoriamente").then( () => {this.router.navigate(['/warriors']);
          });
        },
        error: (err) => {
          console.error('Error actualizando guerrero', err);
          AlertUtil.error(err.err.message);
        }
      });
    } else {
      this.warriorUpdated.markAllAsTouched();
      AlertUtil.info("Campos fantantes por diligenciar");
    }
  }

}
