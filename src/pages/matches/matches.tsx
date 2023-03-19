import { FC, useState, useCallback, ChangeEvent } from 'react';

import { useAppSelector } from '../../hooks/redux';
import { useGetMatches } from '../../hooks/match/useGetMatches';
import { MatchRow } from '../../components/match-row';
import { IMatch } from '../../domain/match';

import './matches.css';

interface IMatchesProps {}

export const Matches: FC<IMatchesProps> = () => {
  const { name: environment } = useAppSelector((state) => state.environment);

  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(20);

  // Handlers
  const handleChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setLimit(+event.target.value)
    setPage(0);
  }, []);

  let matchesResponse = null;
  let matches: IMatch[] = [];
  let total = 0;
  if (environment) {
    matchesResponse = useGetMatches({
      environment,
      page: page + 1,
      limit,
    });
    if (matchesResponse) {
      matches = matchesResponse.data;
      total = matchesResponse.total;
    }
  }

  return (
    <div className="matches">
      <h1>Matches</h1>
      {
        matches && matches.map((match: IMatch) => 
          <MatchRow
            key={match.id}
            teams={match.teams}
            team1={match.team1}
            team2={match.team2}
            team1Goals={match.team1Goals}
            team2Goals={match.team2Goals}
            createdAt={match.createdAt}
            finishedAt={match.finishedAt}
            winner={match.winner}
            showDate={true}
          />
        )
      }
    </div>
  )
};
