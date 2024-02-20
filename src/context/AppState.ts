import { Legume } from '../models/Plante';

export interface AppState {
  legumes: Legume[];
  setLegumes: (legumes: Legume[]) => void;
}
