export interface Legume {
  id: string;
  nom: string;
  description: string;
  calendrier?: CalendrierLegume;
  compagnons?: string[];
}

interface CalendrierLegume {
  janvier: ETAPE_CALENDRIER | null;
  février: ETAPE_CALENDRIER | null;
  mars: ETAPE_CALENDRIER | null;
  avril: ETAPE_CALENDRIER | null;
  mai: ETAPE_CALENDRIER | null;
  juin: ETAPE_CALENDRIER | null;
  juillet: ETAPE_CALENDRIER | null;
  août: ETAPE_CALENDRIER | null;
  septembre: ETAPE_CALENDRIER | null;
  octobre: ETAPE_CALENDRIER | null;
  novembre: ETAPE_CALENDRIER | null;
  décembre: ETAPE_CALENDRIER | null;
}

enum ETAPE_CALENDRIER {
  SEMIS_SOUS_ABRI = "semis sous abri",
  SEMIS_PLEINE_TERRE = "semis pleine terre",
  PLANTATION = "plantation",
  RECOLTE = "récolte",
}
