import { Breed } from "../../breedWarrior/models/breed.model";
import { Power } from "../../powers/models/power.model";
import { TypeWarrior } from "../../typeWarrior/models/typeWarrior.model";

export interface Player{
    playerId:number,
    nickname:string,
    warriorSelected: [
        warriorId : number,
        warriorName : string,
        warriorLife : number,
        warriorEnergy : number,
        powers : Power[],
        warriorType : TypeWarrior,
        warriorBreed : Breed
    ],
    user: {
        email: string,
        password: string,
        role: {
            id: number,
            name: string,
            description: string
        },
        userId: number,
        userStatus: {
            id: number,
            name: string,
            description: string
        }
    },
    points: number,
    gamesWon: number,
    gamesLost: number
}