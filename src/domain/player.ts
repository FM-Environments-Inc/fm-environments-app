import { IAward } from './award';
import { ICountry } from './country';
import { IEnvironment } from './environment';

export enum PLAYER_POSITION {
  GK = 'GK',
  CB = 'CB',
  LB = 'LB',
  RB = 'RB',
  CDM = 'CDM',
  CM = 'CM',
  CAM = 'CAM',
  LM = 'LM',
  RM = 'RM',
  LW = 'LW',
  RW = 'RW',
  ST = 'ST',
};

export enum PLAYER_ROLE {
  GOALKEEPER = 'GOALKEEPER',
  DEFENDER = 'DEFENDER',
  MIDFIELDER = 'MIDFIELDER',
  ATTACKER = 'ATTACKER'
};

export const playerRoles = {
  GOALKEEPER: 'GOALKEEPER',
  DEFENDER: 'DEFENDER',
  MIDFIELDER: 'MIDFIELDER',
  ATTACKER: 'ATTACKER'
};

export interface IPlayer {
  id: number;
  firstname?: string;
  lastname: string;
  age: number;
  matches?: number;
  points_earned?: number;
  assists_earned?: number;
  evaluation: number;
  photo?: string;
  role?: PLAYER_ROLE;
  country: ICountry;
  environment: IEnvironment;
  team: IPlayerTeam;
  position?: PLAYER_POSITION;
  overallRating: number;
  awards: IAward[];
}

export interface IPlayerTeam {
  name: string;
  logo?: string;
}
