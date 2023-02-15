import { FC } from 'react';

import { useActions } from '../../hooks/actions';

import { Menu } from '../menu';

import { AppSelect } from '../select';

import './header.css';

interface IHeaderProps {
  currentEnvironment: string;
  environments: string[];
}

export const Header: FC<IHeaderProps> = (props) => {
  const { currentEnvironment, environments } = props;

  const { setEnvironment } = useActions();

  return (
    <div className="header">
      <Menu />
      <AppSelect value={currentEnvironment} label='Environment' list={environments} />
    </div>
  )
}
