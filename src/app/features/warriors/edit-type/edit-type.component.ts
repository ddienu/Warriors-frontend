import { Component, OnInit } from '@angular/core';
import { WarriorService } from '../../../core/services/warrior.service';
import { TypeWarriorService } from '../../../core/services/type-warrior.service';
import { TypeWarrior } from '../../typeWarrior/models/typeWarrior.model';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { HeaderComponent } from '../../header/header.component';
import AlertUtil from '../../../shared/utils/AlertUtil.util';


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
    private route : ActivatedRoute,
    private router : Router
  ) {
    this.typeWarriorForm = this.fb.group({
      typeWarriorId : [0, [Validators.required, Validators.min(1)]]
    })

  }
  ngOnInit(): void {
    this.getAllTypeWarriors();
    this.warriorId = +this.route.snapshot.paramMap.get('id')!;
    if( this.warriorId){
      this.getWarriorById(this.warriorId);
    }
  }

  getWarriorById(warriorId : number){
    this.warriorService.getWarriorById(warriorId).subscribe({
      next: (response) => {
        const warriorData = response.data;
        this.typeWarriorForm.patchValue({
          typeWarriorId: warriorData.warriorType.typeWarriorId
        });
      },
      error: (err) => {
        console.error("Error retrieving warrior by id", err);
      }
    })
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
          AlertUtil.success("Tipo de guerrero actualizado satisfactoriamente.").then(() => {this.router.navigate(['/warriors'])});
        },
        error : (error) => {
          console.error('Error updating type warrior', error);
          if(error.error.message.includes("is the same")){
            AlertUtil.error("El guerrero ya tiene este tipo asignado. Por favor, selecciona uno diferente.");
            return;
          };
          AlertUtil.error("Error al actualizar el tipo de guerrero");
        }
      })
    }
  }

  selectType(typeWarriorId : number) : void{
    this.typeWarriorForm.get('typeWarriorId')?.setValue(typeWarriorId);
  }



}
