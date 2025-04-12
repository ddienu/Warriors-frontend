import { Breed } from "../../breedWarrior/models/breed.model";
import { Power } from "../../powers/models/power.model";
import { TypeWarrior } from "../../typeWarrior/models/typeWarrior.model";

export interface Warrior {
  warriorId : number,
  warriorName : string,
  warriorLife : number,
  warriorEnergy : number,
  powers : Power[],
  warriorType : TypeWarrior,
  warriorBreed : Breed
}