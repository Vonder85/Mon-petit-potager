import { Box, Button, ButtonGroup, Theme } from "@mui/material";
import { pxToRem } from "../../config/theme/utilities";
import { makeStyles } from "tss-react/mui";
import { useState } from "react";
import { MOIS } from "../../models/Calendrier";

const useStyles = makeStyles()((theme: Theme) => {
  return {
    grid: {
      display: "grid",
      width: "100%",
      gridTemplateAreas: `
      ".  header"
      "nav calendrier"
      "nav calendrier"`,
      gridTemplateColumns: "20% 1fr",
      marginTop: "3rem",
    },
    header: {
      gridArea: "header",
      textAlign: "center",
    },
    buttons: {
      gridArea: "nav",
      marginRight: "auto",
      marginLeft: "auto",
    },
    buttonGroup: {
      border: `${pxToRem(2)} solid`,
      borderRadius: pxToRem(22),
      color: theme.palette.primary.main,
      boxShadow: "initial",

      "& button": {
        borderRadius: pxToRem(19),
        height: "100%",
      },
      "& .MuiButton-containedSecondary": {
        boxShadow: "inherit",
      },
    },
    calendrier: {
      gridArea: "calendrier",
      marginRight: "auto",
      marginLeft: "auto",
    },
    buttonSelected: {
      "&:hover": {
        cursor: "default",
        backgroundColor: theme.palette.secondary.main,
      },
    },
  };
});

export const Calendrier = () => {
  const { classes } = useStyles();
  const families = [
    {
      id: "legumes",
      label: "Légumes",
    },
    {
      id: "aromatiques",
      label: "Plantes aromatiques",
    },
  ];
  const [familySelected, setFamilySelected] = useState("legumes");
  const [moisSelected, setMoisSelected] = useState<MOIS | undefined>();

  const isSelected = (mois: string): boolean => {
    return moisSelected === mois;
  };

  return (
    <div className={classes.grid}>
      <Box
        sx={{
          display: "flex",
          "& > *": {
            m: 1,
          },
        }}
        className={classes.buttons}
      >
        <ButtonGroup
          orientation='vertical'
          aria-label='vertical contained button group'
          variant='contained'
          className={classes.buttonGroup}
        >
          {families.map((family: any) => (
            <Button
              key={family.id}
              color={familySelected === family.id ? "primary" : "secondary"}
            >
              <span>{family.label}</span>
            </Button>
          ))}
        </ButtonGroup>
      </Box>
      <header className={classes.header}>
        <h1>Calendrier</h1>
      </header>
      <div className={classes.calendrier}>
        <ButtonGroup
          variant='contained'
          aria-label="Mois de l'année"
          className={classes.buttonGroup}
        >
          {Object.values(MOIS).map((mois) => (
            <Button
              onClick={() => setMoisSelected(mois)}
              className={isSelected(mois) ? classes.buttonSelected : ""}
              color={isSelected(mois) ? "secondary" : "primary"}
            >
              {mois}
            </Button>
          ))}
        </ButtonGroup>
      </div>
    </div>
  );
};
