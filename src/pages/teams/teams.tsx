import { FC, useState, useCallback, ChangeEvent } from 'react';
import { FormControlLabel, Checkbox, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { useGetTeams } from '../../hooks/team/useGetTeams';
import { useGetRegions } from '../../hooks/region/useGetRegions';
import { useGetCountries } from '../../hooks/country/useGetCountries';
import { useAppSelector } from '../../hooks/redux';

import { COLORS } from '../../common/colors';

import { DataGrid } from '../../components/data-grid';
import { AppSelect } from '../../components/select';

import './teams.css';

interface ITeamsProps {}

interface IRow {
  logo?: string;
  name: string;
  country: string;
  division: string;
  evaluation: number;
  matches: number;
  wins: number;
  draws: number;
  loses: number;
  points_earned: number;
  enemy_points_earned: number;
  points_difference: number;
}

const columns = [
  {
    id: 'logo',
    label: 'Logo',
  },
  {
    id: 'name',
    label: 'Name',
  },
  {
    id: 'country',
    label: 'Country',
  },
  {
    id: 'division',
    label: 'Division',
  },
  {
    id: 'evaluation',
    label: 'Evaluation',
  },
  {
    id: 'matches',
    label: 'Matches',
  },
  {
    id: 'wins',
    label: 'Wins',
  },
  {
    id: 'draws',
    label: 'Draws',
  },
  {
    id: 'loses',
    label: 'Loses',
  },
  {
    id: 'winrate',
    label: 'Winrate',
  },
  {
    id: 'points_earned',
    label: 'Points earned',
  },
  {
    id: 'enemy_points_earned',
    label: 'Enemy points earned',
  },
  {
    id: 'points_difference',
    label: 'Points difference',
  },
];

export const Teams: FC<ITeamsProps> = () => {
  const { name: environment } = useAppSelector((state) => state.environment);

  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(20);
  const [isNational, setIsNational] = useState<boolean>(false);
  const [order, setOrder] = useState<string>('DESC');
  const [sortBy, setSortBy] = useState<string>('evaluation');
  const [country, setCountry] = useState<string | null>(null);
  const [region, setRegion] = useState<string | null>(null);

  // Handlers
  const handleChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setLimit(+event.target.value)
    setPage(0);
  }, []);

  const handleRegionFilterChange = useCallback((event: any) => {
    setRegion(event.target.value);
  }, []);

  const handleCountryFilterChange = useCallback((event: any) => {
    setCountry(event.target.value);
  }, []);

  const handleIsNationalFilterChange = () => {
    setIsNational(!isNational);
  };

  const onClearFilters = () => {
    setCountry(null);
    setRegion(null);
    setIsNational(false);
  };

  // Teams
  const teams = useGetTeams({
    environment: environment || '',
    page: page + 1, // Data grid has zero index page
    limit,
    isNational,
    order,
    country: country || undefined,
    region: region || undefined,
    sortBy,
  });

  // Regions
  const regions = useGetRegions();
  const regionNames = regions ? regions.map((region) => region.name) : [];

  // Countries
  const countries = useGetCountries();
  const countryNames = countries ? countries.map((country) => country.name) : [];

  // Table rows
  const rows: IRow[] = teams
    ? teams.map((team) => ({
      ...team,
      country: team.country.name,
      division: team.division.name,
      winrate: team.wins + team.loses === 0
        ? 0
        : `${Number(+team.wins / (+team.wins + team.loses)).toFixed(2) * 100}%`
    }))
    : [];

  return (
    <div className="teams">
      <h1>Teams</h1>
      <div className="teams-options">
        <AppSelect
          list={regionNames}
          label='Region'
          value={region}
          showFormHelper
          handleChange={handleRegionFilterChange}
        />
        <AppSelect
          list={countryNames}
          label='Country'
          value={country}
          showFormHelper
          handleChange={handleCountryFilterChange}
        />
        <FormControlLabel
          value="bottom"
          control={
            <Checkbox
              onChange={handleIsNationalFilterChange}
              value={isNational}
              sx={{ color: COLORS.PRIMARY }}
            />
          }
          label="National"
          labelPlacement="bottom"
        />
        <div className="teams-clear">
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
