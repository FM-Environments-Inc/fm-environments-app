import { FC, useState, useCallback, ChangeEvent } from 'react';
import Pagination from '@mui/material/Pagination';
import { makeStyles } from "@mui/styles";

import { useAppSelector } from '../../hooks/redux';
import { useGetMatches } from '../../hooks/match/useGetMatches';
import { MatchRow } from '../../components/match-row';
import { IMatch } from '../../domain/match';
import { COLORS } from '../../common/colors';

import './matches.css';

interface IMatchesProps {}

const useStyles = makeStyles(() => ({
  ul: {
    "& .MuiPaginationItem-root": {
      color: COLORS.WHITE
    },
  }
}));

export const Matches: FC<IMatchesProps> = () => {
  const { name: environment } = useAppSelector((state) => state.environment);

  const [page, setPage] = useState<number>(1);

  // Handlers
  const handleChangePage = useCallback((_: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  let matchesResponse = null;
  let matches: IMatch[] = [];
  let total = 0;
  const limit = 20;
  if (environment) {
    matchesResponse = useGetMatches({
      environment,
      page,
      limit,
    });
    if (matchesResponse) {
      matches = matchesResponse.data;
      total = matchesResponse.total;
    }
  }

  const pages = Math.floor(total / limit) + 1;

  const classes = useStyles();

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
      <Pagination
        count={pages}
        page={page}
        onChange={handleChangePage}
        color='primary'
        size='large'
        classes={{ ul: classes.ul }}
      />
    </div>
  )
};
