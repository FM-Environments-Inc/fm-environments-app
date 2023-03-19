import { FC } from 'react';

import { IMatchTeam } from '../../domain/match';
import { IMAGE_PLACEHOLDER_URL } from '../../common/constants';
import { formatDate } from '../../utils';

import './match-row.css';

interface IMatchRowProps {
  team1: string;
  team2: string;
  winner: string;
  team1Goals: string;
  team2Goals: string;
  createdAt: string;
  finishedAt?: string;
  teams?: IMatchTeam[];
  key: number;
  showDate?: boolean;
}

interface ILogoProps {
  logo?: string;
  name: string;
}

const Logo: FC<ILogoProps> = (props) => {
  const { logo, name } = props;
  return (
    <img
      src={logo || IMAGE_PLACEHOLDER_URL}
      alt={name}
      width='100vw'
      height='80vh'
    />
  );
};

export const MatchRow: FC<IMatchRowProps> = (props) => {
  const { winner, teams, team1Goals, team2Goals, createdAt, finishedAt, key, showDate = false } = props;

  if (!teams || teams.length < 2) {
    return null;
  }

  const [homeTeam, awayTeam] = teams;

  const getScoreClassName = (teamId: string, winner: string | null) => {
    switch (true) {
      case winner && teamId === winner:
        return 'match-winner';
      case winner && teamId !== winner:
        return 'match-loser';
      default:
        return 'match-draw';
    }
  };

  return (
    <div className='match' key={key}>
      <div className='match-row'>
        <Logo name={homeTeam.name} logo={homeTeam.logo} />
        <div className='match-score'>
          <span>{homeTeam.name}</span>
          <span className={getScoreClassName(homeTeam._id, winner)}>{team1Goals}</span>
          <span>:</span>
          <span className={getScoreClassName(awayTeam._id, winner)}>{team2Goals}</span>
          <span>{awayTeam.name}</span>
        </div>
        <Logo name={awayTeam.name} logo={awayTeam.logo} />
      </div>
      {
        showDate && 
        <div className='match-date'>
          {formatDate(createdAt)}
        </div>
      }
    </div>
  )
};
