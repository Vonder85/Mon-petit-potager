import { createContext } from 'react';
import { AppState } from './AppState';
import { Legume } from '../models/Plante';

export default createContext<AppState>({
  legumes: [],
  setLegumes: (legumes: Legume[]) => [],
});
