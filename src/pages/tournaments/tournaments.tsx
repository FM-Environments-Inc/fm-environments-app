import { FC, useState, useCallback, ChangeEvent } from 'react';
import { FormControlLabel, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Chip from '@mui/material/Chip';

import { useAppSelector } from '../../hooks/redux';
import { useGetTournaments } from '../../hooks/tournament/useGetTournaments';

import { COLORS } from '../../common/colors';

import './tournaments.css';

interface ITournamentsProps {}

export const Tournaments: FC<ITournamentsProps> = () => {
  const { name: environment } = useAppSelector((state) => state.environment);

  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(20);
  const [showFinished, setShowFinished] = useState<boolean>(true);

  // Handlers
  const handleChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setLimit(+event.target.value)
    setPage(0);
  }, []);

  const handleShowFinishedFilterChange = (event: any) => {
    (event.target.value);
  };

  const handleCountryFilterChange = useCallback((event: any) => {
    setShowFinished(!showFinished);
  }, []);

  // Tournaments
  const tournaments = useGetTournaments({
    environment,
    page: page + 1,
    limit,
    showFinished,
  });

  const getLabelColor = (tier: number): string => {
    switch (tier) {
      case 1:
        return 'red';
      case 2:
        return 'orange';
      case 3:
        return 'yellow';
      default:
        return '#fff';
    }
  };

  return (
    <div className="tournaments">
      <h1>Tournaments</h1>
      <div className="tournaments-list">
        {
          tournaments && tournaments.map((tournament) => (
            <div className="tournaments-list-item" key={tournament.id}>
              <div className="tournaments-list-item-title">
                <span>{tournament.name}</span>
                <Chip
                  label={`Tier ${tournament.tier}`}
                  sx={{
                    color: getLabelColor(tournament.tier),
                    border: `1px solid ${getLabelColor(tournament.tier)}`
                  }}
                />
              </div>
              <div className="tournaments-list-item-subtitle">
                <span>32 participants</span>
                { tournament.isFinished && <span><b><em>Finished</em></b></span> }
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
};
