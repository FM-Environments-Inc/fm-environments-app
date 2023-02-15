import { FC } from 'react';
import { Select, MenuItem, InputLabel, FormControl, FormHelperText, SelectChangeEvent } from '@mui/material';

import { COLORS } from '../../common/colors';

import './select.css';

interface ISelectProps {
  list: string[];
  value: string | null;
  label: string;
  showLabel?: boolean;
  showFormHelper?: boolean;
  handleChange?: any; // TODO: fix type
}

export const AppSelect: FC<ISelectProps> = (props) => {
  const { list, value, label, handleChange, showLabel = false, showFormHelper = false } = props;

  return (
    <FormControl
      variant="standard"
      sx={{ m: 1, minWidth: '8em', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      {
        showLabel &&
        <InputLabel
          id="demo-simple-select-standard-label"
          sx={{ color: COLORS.PRIMARY, textAlign: 'center', verticalAlign: 'middle' }}
        >{label}</InputLabel>
      }
      <Select
        labelId="demo-simple-select-standard-label"
        sx={{
          height: '2.5em',
          minWidth: '8em',
          border: `1px solid ${COLORS.PRIMARY}`,
          boxSizing: 'border-box',
          color: COLORS.PRIMARY,
          '& .MuiSelect-icon': {
            color: COLORS.PRIMARY,
          },
        }}
        value={value}
        label={label}
        onChange={handleChange}
      >
        <MenuItem value={null}>
          <em>None</em>
        </MenuItem>
        { list.map((name) => <MenuItem key={name} value={name}>{name}</MenuItem>) }
      </Select>
      { showFormHelper && <FormHelperText sx={{ color: COLORS.PRIMARY, fontSize: '0.8em' }}>{label}</FormHelperText> }
    </FormControl>
  )
}
