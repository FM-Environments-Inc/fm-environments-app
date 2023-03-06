import { FC, ReactNode } from 'react';
import { Button } from '@mui/material';

import { COLORS } from '../../common/colors';

import './app-button.css';

interface IButtonProps {
  text: string;
  onClick?: any; // TODO: fix type
  isPrimary: boolean;
  children?: ReactNode;
}

export const AppButton: FC<IButtonProps> = (props) => {
  const { text, onClick, isPrimary = false, children } = props;

  return (
    <Button
      className='btn'
      onClick={onClick}
      variant={isPrimary ? 'contained' : 'outlined'}
      sx={{
        color: isPrimary ? COLORS.WHITE : COLORS.PRIMARY,
        border: `1px solid ${COLORS.PRIMARY}`
      }}
    >
      {text}
      {children}
    </Button>
  );
}
