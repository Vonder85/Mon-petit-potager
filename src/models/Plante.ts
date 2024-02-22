export interface Legume {
  id?: string;
  nom: string;
  description: string;
  calendrier?: CalendrierLegume;
  compagnons?: string[];
}

export type Plante = Legume;

export interface CalendrierLegume {
  Jan?: ETAPE_CALENDRIER[] | null;
  Fev?: ETAPE_CALENDRIER[] | null;
  Mar?: ETAPE_CALENDRIER[] | null;
  Avr?: ETAPE_CALENDRIER[] | null;
  Mai?: ETAPE_CALENDRIER[] | null;
  Jui?: ETAPE_CALENDRIER[] | null;
  Juil?: ETAPE_CALENDRIER[] | null;
  Aou?: ETAPE_CALENDRIER[] | null;
  Sep?: ETAPE_CALENDRIER[] | null;
  Oct?: ETAPE_CALENDRIER[] | null;
  Nov?: ETAPE_CALENDRIER[] | null;
  Dec?: ETAPE_CALENDRIER[] | null;
}

export enum ETAPE_CALENDRIER {
  SEMIS_EN_POT = 'semis en pot',
  SEMIS_PLEINE_TERRE = 'semis pleine terre',
  PLANTATION = 'plantation',
  RECOLTE = 'récolte',
}
