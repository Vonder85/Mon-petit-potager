import { Autocomplete, TextField, Theme } from "@mui/material";
import { SetStateAction, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import cities from "../../../../data/cities/cities.json";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme: Theme) => {
  return {
    input: {
      "& .MuiInput-input": {
        textTransform: "capitalize",
      },
    },
  };
});

interface Option {
  label: string;
  value: string;
}

export const LocalisationForm = () => {
  const { classes } = useStyles();
  const methods = useFormContext();
  const {
    formState: { errors },
  } = useFormContext();

  const [result, setResult] = useState<
    SetStateAction<{ zip_code: string; label: string }[]>
  >([]);
  const [options, setOptions] = useState<{ label: string; value: string }[]>(
    []
  );

  const removeDoublons = () => {
    const uniqueNames: SetStateAction<{ zip_code: string; label: string }[]> =
      [];
    const seenNames = new Set();

    cities.forEach((item: any) => {
      if (!seenNames.has(item.label)) {
        seenNames.add(item.label);
        uniqueNames.push(item);
      }
    });
    setResult(uniqueNames);
  };

  useEffect(() => {
    removeDoublons();
    const optionsUpdated = mapToOptions(result);
    setOptions(optionsUpdated);
  }, [result, setOptions]);

  const mapToOptions = (result: any) => {
    let optionsUpdated: Option[] = [];
    result.forEach((element: any) => {
      optionsUpdated.push({
        label: `${element.label} - ${element.zip_code}`,
        value: element.label,
      });
    });
    return optionsUpdated;
  };

  const isOptionEqualToValue = (option: Option, value: Option) =>
    option.value === value.value;

  const checkValidLocalisation = () => {
    if (
      !options.some((option) => option.label === methods.watch("localisation"))
    ) {
      methods.setError("localisation", {
        type: "custom",
        message: "Veuillez sélectionner une ville dans la liste.",
      });
    }
  };

  return (
    <>
      <Autocomplete
        id='localisation'
        options={options}
        ListboxProps={{
          sx: {
            "& .MuiAutocomplete-option": { textTransform: "capitalize" },
          },
        }}
        sx={{
          width: 300,
        }}
        getOptionLabel={(option) => option.label}
        isOptionEqualToValue={isOptionEqualToValue}
        onBlur={checkValidLocalisation}
        renderInput={(params) => (
          <TextField
            className={classes.input}
            variant='standard'
            {...params}
            label='Où ?'
            {...methods.register("localisation")}
            error={!!errors.localisation}
            helperText={
              errors.localisation && (errors.localisation.message as string)
            }
          />
        )}
      />
    </>
  );
};
