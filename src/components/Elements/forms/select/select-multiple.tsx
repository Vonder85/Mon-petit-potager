import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { makeStyles } from 'tss-react/mui';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface MultipleSelectProps {
  label: string;
  items: string[];
  datas?: string[];
  onChange: (value: string[]) => void;
}

const useStyles = makeStyles()(() => {
  return {
    root: {
      display: 'flex',
    },
  };
});

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
}

export const MultipleSelectChip = (props: MultipleSelectProps) => {
  const { classes } = useStyles();
  const theme = useTheme();
  const [items, setItems] = React.useState<string[]>(props.datas ?? []);

  const handleChange = (event: SelectChangeEvent<typeof items>) => {
    const {
      target: { value },
    } = event;
    const selectedItems = typeof value === 'string' ? value.split(',') : value;

    setItems(selectedItems);

    props.onChange(selectedItems);
  };

  const handleDelete = (index: number) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);

    setItems(updatedItems);

    props.onChange(updatedItems);
  };

  return (
    <div className={classes.root}>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id={`${props.label}-label`}>{props.label}</InputLabel>
        <Select
          id={`${props.label}-multiple-chip`}
          multiple
          value={items}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label={props.label} />}
          MenuProps={MenuProps}
        >
          {props.items.map((item) => (
            <MenuItem key={item} value={item} style={getStyles(item, items, theme)}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {items.map((value, index) => (
            <Chip key={value} label={value} onDelete={() => handleDelete(index)} />
          ))}
        </Box>
      </div>
    </div>
  );
};
