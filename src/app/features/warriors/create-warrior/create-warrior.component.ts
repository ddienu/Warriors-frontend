import { Component, OnInit } from '@angular/core';
import { Power } from '../../powers/models/power.model';
import { PowerService } from '../../../core/services/power.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Breed } from '../../breedWarrior/models/breed.model';
import { TypeWarrior } from '../../typeWarrior/models/typeWarrior.model';
import { BreedService } from '../../../core/services/breed.service';
import { TypeWarriorService } from '../../../core/services/type-warrior.service';
import { createWarriorDTO } from '../models/createWarrior.dto';
import { WarriorService } from '../../../core/services/warrior.service';
import { HeaderComponent } from '../../header/header.component';
import { AlertService } from '../../../core/services/alert.service';
import { Router } from '@angular/router';
import AlertUtil from '../../../shared/utils/AlertUtil.util';


@Component({
  selector: 'app-create-warrior',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent],
  templateUrl: './create-warrior.component.html',
  styleUrl: './create-warrior.component.css'
})
export default class CreateWarriorComponent implements OnInit{

  powers : Power[] = [];
  breeds : Breed[] = [];
  typeWarriors : TypeWarrior[] = [];
  warriorForm : FormGroup;

  constructor(
    private powerService : PowerService, 
    private breedService : BreedService,
    private typeWarriorService : TypeWarriorService,
    private warriorService : WarriorService,
    private alertService : AlertService,
    private router : Router,
    private fb : FormBuilder) {
    this.warriorForm = this.fb.group({
      warriorName : ['', Validators.required],
      warriorLife : [0, [Validators.required, Validators.min(1)]],
      warriorEnergy : [0, [Validators.required, Validators.min(1)]],
      powers : [[], Validators.required],
      warriorType : [0, [Validators.required, Validators.min(1)]],
      breedWarrior : [0, [Validators.required, Validators.min(1)]]
    })
  }

  ngOnInit(): void {
    this.getPowers();
    this.getBreeds();
    this.getTypeWarriors();
  }


  getPowers() : void {
    this.powerService.getPowers().subscribe({
      next: (response) => {
        this.powers = response.data;
      },
      error: (error) => {
        console.error('Error loading powers', error);
      },
      complete: () => {
        console.log("Powers cargados satisfactoriamente");
      }
    })
  }

  getBreeds() : void {
    this.breedService.getBreeds().subscribe({
      next : (response) => {
        this.breeds = response.data;
      },
      error : (error) => {
        console.error("Error loading breeds", error);
      },
      complete : () => {
        console.log("Breeds cargadas satisfactoriamente");
      }
    })
  }

  getTypeWarriors() : void {
    this.typeWarriorService.getTypeWarriors().subscribe({
      next : (response) => {
        this.typeWarriors = response.data;
      },
      error : (error) => {
        console.error("Error loading type warriors", error);
      },
      complete : () => {
        console.log("Type warriors cargados satifactoriamente");
      }
    })
  }

  onSubmit() : void {
    if( this.warriorForm.valid){

      const formValue = this.warriorForm.value;

      const newWarrior : createWarriorDTO = {
        ...formValue,
        warriorType : Number(formValue.warriorType),
        breedWarrior : Number(formValue.breedWarrior)
      }
      
      this.warriorService.createWarrior(newWarrior).subscribe({
        next : () => {
          AlertUtil.success("Guerrero creado satisfactoriamente").then(() => {this.router.navigate(['/warriors'])});
        },
        error : (error) => {
          console.error("Error creating new warrior", error);
          AlertUtil.error(error.error.message);
        },
        complete : () => {
          console.log("Creación del nuevo guerrero finalizada.");
        }
      })
    }else{
      this.warriorForm.markAllAsTouched();
      AlertUtil.info("Campos faltantes por diligenciar");
      return;
    }
  }

  selectType(id: number): void {
    this.warriorForm.get('warriorType')?.setValue(id);
  }

  togglePower(powerId: number): void {
    const powers = this.warriorForm.get('powers')?.value || [];
    const index = powers.indexOf(powerId);
  
    if (index >= 0) {
      powers.splice(index, 1);
    } else {
      powers.push(powerId);
    }
  
    this.warriorForm.get('powers')?.setValue([...powers]);
  }
  
  // Iconos personalizados para cada poder
  getPowerIcon(powerName: string): string {
    switch (powerName.toLowerCase()) {
      case 'fireball': return '🔥';
      case 'ice arrow': return '❄️🏹';
      case 'sword slash': return '🗡️💨';
      case 'healing light': return '✨🩹';
      case 'thunder strike': return '⚡💥';
      case 'shadow step': return '🌑👣';
      case 'earthquake': return '🌍💢';
      case 'poison cloud': return '☠️🌫️';
      case 'wind blade': return '💨🔪';
      default: return '✨';
    }
  }

  selectBreed(breedId : number) : void {
    this.warriorForm.get('breedWarrior')?.setValue(breedId);
  }
}
