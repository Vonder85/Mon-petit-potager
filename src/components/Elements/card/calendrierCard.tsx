import { makeStyles } from 'tss-react/mui';
import { ETAPE_CALENDRIER } from '../../../models/Plante';
import { CardComponent } from './card';
import { List, ListItem, ListItemIcon, ListItemText, Theme } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

interface CalendrierCardProps {
  title: string;
  content: ETAPE_CALENDRIER[];
  image?: string;
  className?: string;
}

const useStyles = makeStyles()((theme: Theme) => {
  const {
    typography: { pxToRem },
    palette: {
      primary: { main },
    },
  } = theme;
  return {
    root: {
      '&.MuiPaper-root': {
        borderRadius: pxToRem(20),
        fontSize: pxToRem(14),
        textTransform: 'none',
        maxWidth: '20%',
        fontWeight: 900,
        maxHeight: '40rem',
        border: `solid 2px ${main}`,
        width: '-webkit-fill-available',
        color: main,
        '& .MuiCardContent-root': {
          padding: pxToRem(7),
          color: main,
        },
        '& .MuiListItemIcon-root': {
          minWidth: pxToRem(30),
        },
        '& .MuiListItemText-root::first-letter': {
          textTransform: 'capitalize',
        },
      },
    },
  };
});

export const CalendrierCard = (props: CalendrierCardProps) => {
  const { classes } = useStyles();
  const mapContentToList = () => {
    return (
      <List>
        {props.content.map((el) => (
          <ListItem disablePadding>
            <ListItemIcon>
              <ArrowRightAltIcon color="primary" />
            </ListItemIcon>
            <ListItemText>{el}</ListItemText>
          </ListItem>
        ))}
      </List>
    );
  };
  return (
    <CardComponent
      title={props.title}
      content={mapContentToList()}
      className={[classes.root, props.className].join(' ')}
    />
  );
};
