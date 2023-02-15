import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { useActions } from './hooks/actions';
import { useAppSelector } from './hooks/redux';
import { useGetEnvironments } from './hooks/environment/useGetEnvironments';

import { Header } from './components/header';
import { Home } from './pages/home';
import { Teams } from './pages/teams';
import { Players } from './pages/players';
import { Tournaments } from './pages/tournaments';

import { ROUTES } from './common/routes';

import './App.css';

function App() {
  // const { name: environment } = useAppSelector((state) => state.environment);
  const { setEnvironment } = useActions();

  const environments = useGetEnvironments();
  const environmentNames = environments?.length ? environments.map((env) => env.name) : [];
  const currentEnvironment = environments?.length ? environments[0].name : '';
  setEnvironment(currentEnvironment);

  return (
    <div className="App">
      <Router>
        <Header currentEnvironment={currentEnvironment} environments={environmentNames} />
        <Routes>
          <Route path={ROUTES.TEAMS} element={<Teams />} />
          <Route path={ROUTES.PLAYERS} element={<Players />} />
          <Route path={ROUTES.TOURNAMENTS} element={<Tournaments />} />
          <Route path={ROUTES.HOME} element={<Home />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
