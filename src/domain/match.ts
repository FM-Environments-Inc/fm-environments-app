import { ITeamPlayer } from './team';

export interface IMatchTeam {
  _id: string;
  logo?: string;
  name: string;
  players?: ITeamPlayer[];
}

export interface IMatch {
  id: number;
  team1: string;
  team2: string;
  winner: string;
  team1Goals: string;
  team2Goals: string;
  createdAt: string;
  finishedAt: string;
  teams?: IMatchTeam[];
}

export interface IGetAllMatchesResponse {
  total: number;
  limit: number;
  page: number;
  data: IMatch[];
}
