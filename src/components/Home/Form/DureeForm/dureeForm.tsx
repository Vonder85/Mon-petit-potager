import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useFormContext } from "react-hook-form";

const dureeOptions: { label: string; value: number }[] = [
  { label: "3 mois", value: 3 },
  { label: "6 mois", value: 6 },
  { label: "1 an", value: 12 },
];

export const DureeForm = () => {
  const methods = useFormContext();

  return (
    <FormControl variant="standard" sx={{ minWidth: 80 }}>
      <InputLabel id="duree">Durée</InputLabel>
      <Select
        labelId="duree"
        id="duree"
        label="Durée"
        {...methods.register("duree")}
        size="small"
        defaultValue={3}
      >
        {dureeOptions.map((item, index) => (
          <MenuItem key={index} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
