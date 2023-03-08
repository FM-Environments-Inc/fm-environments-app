import { FC, useState, useCallback, ChangeEvent } from 'react';
import { FormControlLabel, Checkbox, Button, Modal, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { useGetTeams } from '../../hooks/team/useGetTeams';
import { useGetRegions } from '../../hooks/region/useGetRegions';
import { useGetCountries } from '../../hooks/country/useGetCountries';
import { useAppSelector } from '../../hooks/redux';
import { useImportTeams } from '../../hooks/team/useImportTeams';

import { COLORS } from '../../common/colors';

import { DataGrid } from '../../components/data-grid';
import { AppSelect } from '../../components/select';
import { Dropzone } from '../../components/dropzone';
import { AppButton } from '../../components/button';

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
  goals: number;
  goalsAgainst: number;
  goalsDifference: number;
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
    id: 'goals',
    label: 'Goals',
  },
  {
    id: 'goalsAgainst',
    label: 'Missed goals',
  },
  {
    id: 'goalsDifference',
    label: 'Goals difference',
  },
];

export const Teams: FC<ITeamsProps> = () => {
  const { name: environment } = useAppSelector((state) => state.environment);

  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(20);
  const [isNational, setIsNational] = useState<boolean>(false);
  const [order, setOrder] = useState<string>('DESC');
  const [sortBy, setSortBy] = useState<string>('evaluation');
  const [country, setCountry] = useState<string>('');
  const [region, setRegion] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
    setCountry('');
    setRegion('');
    setIsNational(false);
  };

  const importTeamsMutation = useImportTeams();

  const handleUploadClick = ([file]: File[]) => {
    console.log('file', file);
    if (!file) {
      return;
    }

    importTeamsMutation({ variables: { file, environment } });
    setIsModalOpen(false);
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
      mathes: team.matches || 0,
      wins: team.wins || 0,
      loses: team.loses || 0,
      draws: team.draws || 0,
      goals: team.goals || 0,
      goalsAgainst: team.goalsAgainst || 0,
      goalsDifference: team.goalsDifference || 0,
      winrate: team.wins === 0 || team.wins + team.loses === 0
        ? 0
        : `${Number(Number(+team.wins / (+team.wins + team.loses)).toFixed(2)) * 100}%`,
      key: team._id,
    }))
    : [];

  return (
    <>
      <Modal
        open={isModalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          width: '100vw',
          maxWidth: '100%',
          height: '100vh',
          maxHeight: '100%',
          position: 'fixed',
          top: '50%',
          left: '0',
          transform: 'translate(0, -50%)',
          overflowY: 'auto',
          color: COLORS.WHITE,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div className="teams-import">
          <Dropzone
            onDrop={handleUploadClick}
          />
        </div>
      </Modal>
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
          <div className="teams-import">
            <AppButton
              onClick={() => setIsModalOpen(true)}
              isPrimary={true}
              text='Import teams'
            />
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
    </>
  )
}
