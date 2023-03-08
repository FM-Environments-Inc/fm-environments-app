import { IRegion } from './region';
import { ICountry } from './country';
import { IDivision } from './division';
import { IEnvironment } from './environment';

export interface ITeam {
  _id: number;
  name: string;
  logo?: string;
  region: IRegion;
  country: ICountry;
  division: IDivision;
  environment: IEnvironment;
  isNational: boolean;
  evaluation: number;
  matches: number;
  wins: number;
  draws: number;
  loses: number;
  goals: number;
  goalsAgainst: number;
  goalsDifference: number;
};
