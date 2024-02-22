import { useContext, useEffect } from 'react';
import PlanteService from '../../services/PlanteService';
import AppContext from '../../context/AppContext';

export const Home = () => {
  const legumes = useContext(AppContext).legumes;

  return <>Nombre de légumes dans la base: {legumes.length}</>;
};
