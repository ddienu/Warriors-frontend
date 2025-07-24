import { Component, OnInit } from '@angular/core';
import { WarriorService } from '../../../core/services/warrior.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BreedService } from '../../../core/services/breed.service';
import { Breed } from '../../breedWarrior/models/breed.model';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-edit-breed',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HeaderComponent],
  templateUrl: './edit-breed.component.html',
  styleUrl: './edit-breed.component.css'
})
export default class EditBreedComponent implements OnInit{

  public breedUpdate : FormGroup;
  public warriorId! : number;
  public breeds : Breed[] = [];


  constructor(
    private warriorService : WarriorService, 
    private fb : FormBuilder, 
    private route : ActivatedRoute,
    private breedService : BreedService 
  ){
    this.breedUpdate = this.fb.group({
      breedId : [0, [Validators.required, Validators.min(1)]]
    })
  }

  ngOnInit(): void {
    this.warriorId = +this.route.snapshot.paramMap.get('id')!;
    if( this.warriorId){
      this.warriorService.getWarriorById(+this.warriorId).subscribe( (response) => {
        const warrior = response.data;
        this.breedUpdate.patchValue({
          breedId : warrior.warriorBreed.breedId
        })
      })
    }
    this.loadBreeds();  
  }

  loadBreeds() : void {
    this.breedService.getBreeds().subscribe({
      next : (response) => {
        this.breeds = response.data;
      },
      error : (error) => {
        console.error("Error al cargar las razas", error);
      },
      complete : () => {
        console.log("Razas cargadas satisfactoriamente");
      }
    })
  }

  selectBreed(breedId : number) : void{
    this.breedUpdate.get('breedId')?.setValue(breedId);
  }

  updateWarriorBreed() : void {
  
    if (this.breedUpdate.valid) {
      const data = this.breedUpdate.value;
      this.warriorService.updateWarriorBreed(this.warriorId, data).subscribe({
        next: (res) => {
          // Puedes mostrar una alerta o redireccionar
          console.log('Raza actualizada', res);
        },
        error: (err) => {
          console.error('Error actualizando raza del guerrero', err);
        }
      });
    } else {
      this.breedUpdate.markAllAsTouched();
    }
  }

  

}
