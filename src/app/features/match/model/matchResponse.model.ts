export interface MatchModel{
    id: number,
    name: string,
    code: string,
    createdBy: {
        userId: number,
        email: string
    },
    players: [
        {
            playerId: number,
            nickname: string
        }
    ] | null,
    maxPlayers: number,
    actualPlayers:number,
    winner:{
        playerId: number,
        nickname: string
    }
    active: boolean
}

export interface MatchResponse{
    message: string,
    data: MatchModel[]
}