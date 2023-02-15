export interface ITournament {
  id: number;
  name: string;
  tier: number;
  winner?: ITournamentWinner;
  isFinished?: boolean;
}

export interface ITournamentWinner {
  name: string;
  logo?: string;
}
