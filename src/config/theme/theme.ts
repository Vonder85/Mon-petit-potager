import { createTheme } from "@mui/material/styles";

export const colors = {
  primaryColor: "#566C56",
  secondaryColor: "#F9F6F6",
  backgroundColor: "#D6DDCC",
  whiteColor: "#fff",
};

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primaryColor,
    },
    secondary: {
      main: colors.secondaryColor,
    },
    text: {
      secondary: colors.whiteColor,
    },
  },
  typography: {
    fontFamily: ["SongMyung", "Raleway", "Arial"].join(","),
  },
});

export default theme;