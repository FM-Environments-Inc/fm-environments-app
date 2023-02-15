import { FC } from 'react';
import { Link } from "react-router-dom";

import { ROUTES } from '../../common/routes';

import './menu.css';

interface IMenuProps {}

export const Menu: FC<IMenuProps> = () => {
  return (
    <nav className="menu">
      <ul>
        <li>
          <Link to={ROUTES.HOME}>Home</Link>
        </li>
        <li>
          <Link to={ROUTES.TEAMS}>Teams</Link>
        </li>
        <li>
          <Link to={ROUTES.PLAYERS}>Players</Link>
        </li>
        <li>
          <Link to={ROUTES.TOURNAMENTS}>Tournaments</Link>
        </li>
      </ul>
    </nav>
  )
};
