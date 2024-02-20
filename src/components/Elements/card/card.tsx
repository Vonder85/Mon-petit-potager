import { CardActionArea, CardContent, CardMedia, Icon, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import ImageIcon from '@mui/icons-material/Image';
import { makeStyles } from 'tss-react/mui';
import { pxToRem } from '../../../config/theme/utilities';

interface CardProps {
  content: JSX.Element;
  title: string;
  image?: string;
  className?: string;
}

const useStyles = makeStyles()(() => {
  return {
    image: {
      textAlign: 'center',
    },
  };
});

export const CardComponent = ({ className, content, image, title }: CardProps) => {
  const { classes } = useStyles();
  return (
    <Card sx={{ maxWidth: 345 }} className={className}>
      <CardActionArea>
        <CardContent>
          <Typography variant="h5" component="div" textAlign={'center'}>
            {title}
          </Typography>
          <div className={classes.image}>
            {image ? (
              <CardMedia component="img" height="140" image={image} alt="image legume" />
            ) : (
              <Icon component={ImageIcon} sx={{ fontSize: pxToRem(100) }} />
            )}
          </div>
          <Typography variant="body2" color="text.primary">
            {content}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
