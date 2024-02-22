import React, { useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

//Pages
import { Calendrier } from './pages/calendrier/calendrier';
import { Home } from './components/Home/home';
import { NouvellePlante } from './pages/admin/ajout/nouvellePlante';

//Context
import AppContext from './context/AppContext';

//Service
import PlanteService from './services/PlanteService';

export function RoutesApp() {
  const context = useContext(AppContext);

  useEffect(() => {
    PlanteService.getPlantes().then((result) => context.setLegumes(result));
    window.scrollTo(0, 0);
  }, [context.setLegumes]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="calendrier" element={<Calendrier />} />
      <Route path="/admin/ajout" element={<NouvellePlante />} />
    </Routes>
  );
}
