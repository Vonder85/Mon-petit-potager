import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { LocalisationForm } from "./LocalisationForm/localisationForm";
import { DureeForm } from "./DureeForm/dureeForm";

const useStyles = makeStyles()((theme: Theme) => {
  return {
    form: {
      padding: "0.5rem 1.5rem",
      width: "45%",
      border: "solid 0.2rem",
      borderColor: theme.palette.primary.main,
      borderRadius: "2rem",
      margin: "0 auto",
      display: "flex",
      justifyContent: "space-around",
      "& .MuiInputLabel-root": {
        color: theme.palette.primary.main,
      },
    },
  };
});

export type Inputs = {
  example: string;
  exampleRequired: string;
  categorie: string;
  duree: number;
  localisation: string;
};

export const Form = () => {
  const { classes } = useStyles();
  const { register } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    checkLocalisation(data.localisation);
    console.log(data);
  };

  const checkLocalisation = (data: string) => {
    if (!data) {
      methods.setError("localisation", {
        type: "custom",
        message: "Veuillez sélectionner une ville.",
      });
    }
  };

  const methods = useForm<Inputs>({
    defaultValues: {
      duree: 3,
      categorie: "potager",
    },
  });

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={(e) => {
            methods.handleSubmit(onSubmit);
            e.preventDefault();
          }}
          className={classes.form}
        >
          <Tooltip title="Potager est le seul choix pour le moment">
            <FormControl variant="standard" sx={{ minWidth: 80 }}>
              <InputLabel id="demo-simple-select-label">Quoi ?</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Quoi"
                {...(register("categorie"), { disabled: true })}
                size="small"
                defaultValue="potager"
              >
                <MenuItem value="potager">Potager</MenuItem>
              </Select>
            </FormControl>
          </Tooltip>

          <LocalisationForm />

          <DureeForm />

          <Button type="submit" color="primary" variant="contained">
            Rechercher
          </Button>
        </form>
      </FormProvider>
    </>
  );
};
