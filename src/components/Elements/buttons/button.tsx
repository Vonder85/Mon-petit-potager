import { Button } from "@mui/material";
import { makeStyles } from "tss-react/mui";

interface ClassicButtonProps {
  size: "small" | "medium" | "large";
  rounded?: boolean;
  text: string;
  variant?: "outlined" | "contained";
  color?: "primary" | "secondary";
  className?: string;
  to?: string;
}

const useStyles = makeStyles<{ rounded?: boolean }>()((rounded) => {
  return {
    button: {
      borderRadius: rounded ? "40px" : "0px",
    },
  };
});

export const ClassicButton = (props: ClassicButtonProps) => {
  const { size, rounded = false, text, variant, color, to } = props;

  const { classes } = useStyles({ rounded });
  return (
    <Button
      size={size}
      variant={variant}
      color={color}
      className={classes.button}
      href={to}
    >
      {text}
    </Button>
  );
};
