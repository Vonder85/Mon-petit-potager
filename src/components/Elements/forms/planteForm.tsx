import { Button, Checkbox, Chip, FormControl, FormControlLabel, FormGroup, TextField, Theme } from '@mui/material';
import { CalendrierLegume, ETAPE_CALENDRIER, Plante } from '../../../models/Plante';
import { useContext, useState } from 'react';
import { makeStyles } from 'tss-react/mui';
import { colors } from '../../../config/theme/theme';
import PlanteService from '../../../services/PlanteService';
import { MultipleSelectChip } from './select/select-multiple';
import AppContext from '../../../context/AppContext';

const useStyles = makeStyles()((theme: Theme) => {
  const { whiteColor, primaryColor } = colors;
  return {
    root: {
      margin: '3rem auto',
      width: '80%',
      display: 'block',
      '& .MuiInputLabel-root': {
        color: primaryColor,
      },
      '& .MuiOutlinedInput-root': {
        backgroundColor: whiteColor,
        marginTop: '1rem',
      },
    },
    submitButton: {
      marginTop: '3rem',
    },
    ligneCalendrier: {
      marginRight: '5rem',
    },
    calendrier: {
      marginTop: '2rem',
    },
    chip: {
      maxWidth: '20%',
    },
  };
});

export const PlanteForm = () => {
  const { classes } = useStyles();
  const legumes = useContext(AppContext).legumes;
  const setLegumes = useContext(AppContext).setLegumes;

  const [plante, setPlante] = useState<Plante>({ description: '', nom: '', calendrier: {}, compagnons: [] });
  const [calendrier, setCalendrier] = useState<CalendrierLegume>({
    Jan: null,
    Fev: null,
    Mar: null,
    Avr: null,
    Mai: null,
    Jui: null,
    Juil: null,
    Aou: null,
    Sep: null,
    Oct: null,
    Nov: null,
    Dec: null,
  });
  /**
   * Soumission / Ajout d'un avis
   */
  const handleSubmit = () => {
    PlanteService.postPlante({ ...plante, calendrier }).then(() => {
      setPlante({ description: '', nom: '', calendrier: {}, compagnons: [] });
      setCalendrier({
        Jan: null,
        Fev: null,
        Mar: null,
        Avr: null,
        Mai: null,
        Jui: null,
        Juil: null,
        Aou: null,
        Sep: null,
        Oct: null,
        Nov: null,
        Dec: null,
      });
      setLegumes([...legumes, plante]);
    });
  };

  const handleChange = (mois: keyof CalendrierLegume, etape: ETAPE_CALENDRIER) => {
    const updatedCalendrier = { ...calendrier };
    const etapes = updatedCalendrier[mois] || [];
    const etapeIndex = etapes.indexOf(etape);
    if (etapeIndex === -1) {
      etapes.push(etape);
    } else {
      etapes.splice(etapeIndex, 1);
    }
    updatedCalendrier[mois] = etapes;
    setCalendrier(updatedCalendrier);
  };

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleSubmit();
      }}
      className={classes.root}
    >
      <div>
        <TextField
          id="nom"
          label="Nom"
          value={plante?.nom}
          onChange={(e) => setPlante({ ...plante, nom: e.target.value })}
          size="medium"
          color="primary"
          variant="outlined"
        />
      </div>
      <div>
        <TextField
          multiline
          rows={4}
          id="description"
          label="Description"
          value={plante.description}
          onChange={(e) => setPlante({ ...plante, description: e.target.value })}
          variant="outlined"
        />
      </div>

      <div className={classes.calendrier}>
        {Object.keys(calendrier).map((mois) => (
          <FormControl component="fieldset" className={classes.ligneCalendrier} key={mois}>
            <Chip label={mois} color="primary" className={classes.chip} />
            <FormGroup aria-label="position" row>
              {Object.values(ETAPE_CALENDRIER).map((etape) => (
                <FormControlLabel
                  key={`${mois}-${etape}`}
                  value={etape}
                  control={
                    <Checkbox
                      checked={(calendrier[mois as keyof CalendrierLegume] || []).includes(etape)}
                      onChange={() => handleChange(mois as keyof CalendrierLegume, etape)}
                    />
                  }
                  label={etape}
                  labelPlacement="end"
                />
              ))}
            </FormGroup>
          </FormControl>
        ))}
      </div>

      <div>
        <MultipleSelectChip
          label="Compagnons"
          items={legumes.map((l) => l.nom)}
          onChange={(compagnons: string[]) => setPlante({ ...plante, compagnons })}
          datas={plante.compagnons}
        />
      </div>

      <Button type="submit" variant="contained" size="large" fullWidth color="primary" className={classes.submitButton}>
        Sauvegarder
      </Button>
    </form>
  );
};
