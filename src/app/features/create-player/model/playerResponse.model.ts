import { Breed } from "../../breedWarrior/models/breed.model";
import { Power } from "../../powers/models/power.model";
import { TypeWarrior } from "../../typeWarrior/models/typeWarrior.model";
// import { Warrior } from "../../warriors/models/warrior.model";

export interface PlayerResponse{
    playerId: number,
    nickname: string,
    warriorsSelected: Warrior[],
    user: User,
}

export interface User{
  userId: number;
  email: string;
  password: string;
  userStatus: UserStatus;
  role: Role;
};

export interface Role {
  id: number;
  name: string;
  description: string;
};

export interface UserStatus {
  id: number;
  name: string;
  description: string;
};

export interface Warrior {
  warriorId : number,
  warriorName : string,
  warriorLife : number,
  warriorEnergy : number,
  powers : Power[],
  warriorType : TypeWarrior,
  warriorBreed : Breed
}
