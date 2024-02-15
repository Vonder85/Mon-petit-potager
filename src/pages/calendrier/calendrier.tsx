import { Box, Button, ButtonGroup, Theme } from '@mui/material';
import { pxToRem } from '../../config/theme/utilities';
import { makeStyles } from 'tss-react/mui';
import { useState } from 'react';
import { Categorie, MOIS } from '../../models/Calendrier';

const useStyles = makeStyles()((theme: Theme) => {
  return {
    grid: {
      display: 'grid',
      width: '100%',
      gridTemplateAreas: `
      ".  header"
      "nav calendrier"
      "nav calendrier"`,
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
        height: '100%',
      },
      '& .MuiButton-containedSecondary': {
        boxShadow: 'inherit',
      },
    },
    calendrier: {
      gridArea: 'calendrier',
      marginRight: 'auto',
      marginLeft: 'auto',
    },
    buttonSelected: {
      color: theme.palette.primary.main,
      '&:hover': {
        cursor: 'default',
        backgroundColor: theme.palette.secondary.main,
      },
    },
  };
});

export const Calendrier = () => {
  const { classes } = useStyles();
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
  const [moisSelected, setMoisSelected] = useState<MOIS | undefined>(MOIS.JANVIER);

  const isSelected = (categorie: string): boolean => {
    return moisSelected === categorie || categorie === categorieSelected;
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
        <ButtonGroup
          orientation="vertical"
          aria-label="vertical contained button group"
          variant="contained"
          className={classes.buttonGroup}
        >
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
              onClick={() => setMoisSelected(mois)}
              className={isSelected(mois) ? classes.buttonSelected : ''}
              color={isSelected(mois) ? 'secondary' : 'primary'}
            >
              {mois}
            </Button>
          ))}
        </ButtonGroup>
      </div>
    </div>
  );
};
