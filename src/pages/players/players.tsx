import { FC, useState, useCallback, ChangeEvent } from 'react';
import { FormControlLabel, Checkbox, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { useAppSelector } from '../../hooks/redux';
import { useGetPlayers } from '../../hooks/player/useGetPlayers';
import { useGetCountries } from '../../hooks/country/useGetCountries';

import { COLORS } from '../../common/colors';
import { IPlayer, PLAYER_ROLE, PLAYER_POSITION, playerRoles } from '../../domain/player';

import { DataGrid } from '../../components/data-grid';
import { AppSelect } from '../../components/select';

import './players.css';

interface IPlayersProps {}

interface IRow {
  position: string;
  fullName: string;
  age: number;
  country: string;
  evaluation: number;
  overallRating: number;
  matches: number;
  points_earned: number;
  assists_earned: number;
  teamName: string;
  logo: string;
}

const columns = [
  {
    id: 'evaluation',
    label: 'Evaluation',
  },
  {
    id: 'overallRating',
    label: 'Overall rating',
  },
  {
    id: 'position',
    label: 'Position',
  },
  {
    id: 'fullName',
    label: 'Full name',
  },
  {
    id: 'age',
    label: 'Age',
  },
  {
    id: 'country',
    label: 'Country',
  },
  {
    id: 'matches',
    label: 'Matches',
  },
  {
    id: 'points_earned',
    label: 'Goals',
  },
  {
    id: 'assists_earned',
    label: 'Assists',
  },
  {
    id: 'teamName',
    label: 'Team',
  },
  {
    id: 'logo',
    label: '',
  },
];

export const Players: FC<IPlayersProps> = () => {
  const { name: environment } = useAppSelector((state) => state.environment);

  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(20);
  const [order, setOrder] = useState<string>('DESC');
  const [sortBy, setSortBy] = useState<string>('evaluation');
  const [country, setCountry] = useState<string | null>(null);
  const [role, setRole] = useState<PLAYER_ROLE | null>(null);

  // Handlers
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setLimit(+event.target.value)
    setPage(0);
  };

  const handleCountryFilterChange = (event: any) => {
    setCountry(event.target.value);
  };

  const handleRoleFilterChange = (event: any) => {
    setRole(event.target.value);
  };

  const onClearFilters = () => {
    setCountry(null);
    setRole(null);
  };

  // Countries
  const countries = useGetCountries();
  const countryNames = countries ? countries.map((country) => country.name) : [];

  // Players
  const players = useGetPlayers({
    environment: environment || '',
    page: page + 1, // Data grid has zero index page
    limit,
    order,
    country: country ? country : undefined,
    sortBy,
    role: role ? role : undefined,
  });

  // Table rows
  const rows: IRow[] = players
    ? players.map((player) => ({
      ...player,
      country: player.country.name,
      fullName: player.firstname ? `${player.firstname} ${player.lastname}` : player.lastname,
      teamName: player.team ? player.team.name : '',
      logo: player.team && player.team.logo ? player.team.logo : '',
      position: player.position as string,
      matches: player.matches || 0,
      points_earned: player.points_earned || 0,
      assists_earned: player.points_earned || 0,
    }))
    : [];

  return (
    <div className="players">
      <h1>Players</h1>
      <div className="players-options">
        <AppSelect
          list={Object.keys(PLAYER_ROLE).map(key => PLAYER_ROLE[key]).filter(value => typeof value === 'string') as string[]} // TODO: fix type
          label='Role'
          value={role}
          showFormHelper
          handleChange={handleRoleFilterChange}
        />
        <AppSelect
          list={countryNames}
          label='Country'
          value={country}
          showFormHelper
          handleChange={handleCountryFilterChange}
        />
        <div className="players-clear">
          <Button
            onClick={onClearFilters}
            variant="outlined"
            startIcon={<DeleteIcon />}
            sx={{
              color: COLORS.PRIMARY,
              border: `1px solid ${COLORS.PRIMARY}`
            }}
          >
            Clear
          </Button>
        </div>
      </div>
      <DataGrid
        columns={columns}
        rows={rows}
        page={page}
        limit={limit}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  )
}
