import { IEnvironment } from './environment';

export interface IDivision {
  id: number;
  environment: IEnvironment;
  name: string;
  tier: number;
};
