import { Box, Button, ButtonGroup, Theme } from '@mui/material';
import { pxToRem } from '../../config/theme/utilities';
import { makeStyles } from 'tss-react/mui';
import { useContext, useEffect, useState } from 'react';
import { Categorie, MOIS } from '../../models/Calendrier';
import { CalendrierCard } from '../../components/Elements/card/calendrierCard';
import { ETAPE_CALENDRIER, Legume } from '../../models/Plante';
import AppContext from '../../context/AppContext';

const useStyles = makeStyles()((theme: Theme) => {
  return {
    grid: {
      display: 'grid',
      width: '100%',
      gridTemplateAreas: `
      ".  header"
      "nav calendrier"
      ". calendrier"`,
      gridTemplateColumns: '20% 1fr',
      marginTop: '3rem',
    },
    header: {
      gridArea: 'header',
      textAlign: 'center',
    },
    buttons: {
      gridArea: 'nav',
      marginRight: 'auto',
      marginLeft: 'auto',
    },
    buttonGroup: {
      border: `${pxToRem(2)} solid`,
      borderRadius: pxToRem(22),
      color: theme.palette.primary.main,
      boxShadow: 'initial',

      '& button': {
        borderRadius: pxToRem(19),
      },
      '& .MuiButton-containedSecondary': {
        boxShadow: 'inherit',
      },
    },
    calendrier: {
      gridArea: 'calendrier',
      textAlign: 'center',
    },
    buttonSelected: {
      color: theme.palette.primary.main,
      '&:hover': {
        cursor: 'default',
        backgroundColor: theme.palette.secondary.main,
      },
    },
    resultats: {
      marginTop: '2rem',
      rowGap: '2rem',
      display: 'flex',
      flexFlow: 'row wrap',
      justifyContent: 'space-around',
    },
  };
});

export const Calendrier = () => {
  const { classes } = useStyles();
  const context = useContext(AppContext);
  const categories: Categorie[] = [
    {
      id: 'legumes',
      libelle: 'Légumes',
    },
    {
      id: 'aromatiques',
      libelle: 'Plantes aromatiques',
    },
  ];
  const [categorieSelected, setCategorieSelected] = useState('legumes');
  const [moisSelected, setMoisSelected] = useState<MOIS>(MOIS.FEVRIER);
  const [legumes, setLegumes] = useState<Legume[]>([]);

  const isSelected = (categorie: string): boolean => {
    return moisSelected === categorie || categorie === categorieSelected;
  };

  useEffect(() => {
    setLegumes(
      context.legumes
        .filter((l) => l.calendrier && l.calendrier[moisSelected!]?.length! > 0)
        .sort(function (a, b) {
          if (a.nom > b.nom) {
            return 1;
          }
          if (a.nom < b.nom) {
            return -1;
          }
          return 0;
        }),
    );
  }, [moisSelected]);

  const onChangeMois = (mois: MOIS) => {
    setMoisSelected(mois);
    setLegumes(context.legumes.filter((l) => l.calendrier && l.calendrier[mois!]?.length! > 0));
  };

  return (
    <div className={classes.grid}>
      <Box
        sx={{
          display: 'flex',
          '& > *': {
            m: 1,
          },
        }}
        className={classes.buttons}
      >
        <ButtonGroup orientation="vertical" aria-label="Catégories" variant="contained" className={classes.buttonGroup}>
          {categories.map((categorie: Categorie) => (
            <Button
              key={categorie.id}
              color={isSelected(categorie.id) ? 'secondary' : 'primary'}
              onClick={() => setCategorieSelected(categorie.id)}
              className={isSelected(categorie.id) ? classes.buttonSelected : ''}
            >
              <span>{categorie.libelle}</span>
            </Button>
          ))}
        </ButtonGroup>
      </Box>
      <header className={classes.header}>
        <h1>Calendrier</h1>
      </header>
      <div className={classes.calendrier}>
        <ButtonGroup variant="contained" aria-label="Mois de l'année" className={classes.buttonGroup}>
          {Object.values(MOIS).map((mois) => (
            <Button
              onClick={() => onChangeMois(mois)}
              className={isSelected(mois) ? classes.buttonSelected : ''}
              color={isSelected(mois) ? 'secondary' : 'primary'}
            >
              {mois}
            </Button>
          ))}
        </ButtonGroup>

        <div className={classes.resultats}>
          {legumes.length ? (
            legumes.map((l) => (
              <CalendrierCard
                title={l.nom}
                content={l.calendrier![moisSelected!]?.map((el) => el) as ETAPE_CALENDRIER[]}
              />
            ))
          ) : (
            <span>Rien à faire, repose toi pour être en forme pour la saison !</span>
          )}
        </div>
      </div>
    </div>
  );
};
