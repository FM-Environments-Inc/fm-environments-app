import { FC, useState, useCallback, ChangeEvent } from 'react';
import { FormControlLabel, Checkbox, Button, Modal, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { useAppSelector } from '../../hooks/redux';
import { useGetPlayers } from '../../hooks/player/useGetPlayers';
import { useGetCountries } from '../../hooks/country/useGetCountries';
import { useImportPlayers } from '../../hooks/player/useImportPlayers';

import { COLORS } from '../../common/colors';
import { IPlayer, PLAYER_ROLE, PLAYER_POSITION, playerRoles } from '../../domain/player';

import { DataGrid } from '../../components/data-grid';
import { AppSelect } from '../../components/select';
import { Dropzone } from '../../components/dropzone';
import { AppButton } from '../../components/button';

import './players.css';

interface IPlayersProps {}

interface IRow {
  _id: string;
  position: string;
  fullName: string;
  age: number;
  country: string;
  evaluation: number;
  overall: number;
  matches: number;
  goals: number;
  assists: number;
  teamName: string;
  logo: string;
  key: string;
}

const columns = [
  {
    id: 'evaluation',
    label: 'Evaluation',
    key: 'evaluation',
  },
  {
    id: 'overall',
    label: 'Overall rating',
    key: 'overall',
  },
  {
    id: 'position',
    label: 'Position',
    key: 'position',
  },
  {
    id: 'fullName',
    label: 'Full name',
    key: 'fullName',
  },
  {
    id: 'age',
    label: 'Age',
    key: 'age',
  },
  {
    id: 'country',
    label: 'Country',
    key: 'country',
  },
  {
    id: 'matches',
    label: 'Matches',
    key: 'matches',
  },
  {
    id: 'goals',
    label: 'Goals',
    key: 'goals',
  },
  {
    id: 'assists',
    label: 'Assists',
    key: 'assists',
  },
  {
    id: 'teamName',
    label: 'Team',
    key: 'teamName',
  },
  {
    id: 'logo',
    label: '',
    key: 'logo',
  },
];

export const Players: FC<IPlayersProps> = () => {
  const { name: environment } = useAppSelector((state) => state.environment);

  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(20);
  const [order, setOrder] = useState<string>('DESC');
  const [sortBy, setSortBy] = useState<string>('evaluation');
  const [country, setCountry] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
    setCountry('');
    setRole('');
  };

  const importPlayersMutation = useImportPlayers();

  const handleUploadClick = ([file]: File[]) => {
    console.log('file', file);
    if (!file) {
      return;
    }

    importPlayersMutation({ variables: { file, environment } });
    setIsModalOpen(false);
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
    country: country ? country : '',
    sortBy,
    role: role ? role : undefined,
  });

  // Table rows
  const rows: IRow[] = players
    ? players.map((player) => ({
      ...player,
      country: player.country ? player.country.name : '',
      fullName: player.firstName ? `${player.firstName} ${player.lastName}` : player.lastName,
      teamName: player.playerTeam ? player.playerTeam.name : '',
      logo: player.playerTeam && player.playerTeam.logo ? player.playerTeam.logo : '',
      position: player.position as string,
      matches: player.matches || 0,
      goals: player.goals || 0,
      assists: player.assists || 0,
      overall: player.ratings ? player.ratings.overall : 0,
      key: player._id,
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
      <div className="players">
        <h1>Players</h1>
        <div className="players-options">
          <AppSelect
            list={
              Object
                .keys(PLAYER_ROLE).map((key: string) => PLAYER_ROLE[key])
                .filter(value => typeof value === 'string') as string[]
            } // TODO: fix type
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
        <div className="players-import">
          <AppButton
              onClick={() => setIsModalOpen(true)}
              isPrimary={true}
              text='Import players'
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
