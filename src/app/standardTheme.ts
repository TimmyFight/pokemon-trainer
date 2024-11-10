import { createTheme } from "@mui/material/styles";

const standardTheme = createTheme({
  typography: {
    fontFamily: "var(--font-ibm-vga)",
  },
  palette: {
    primary: {
      light: "#e5d2ff",
      main: "#9847ff",
      dark: "#7134bf",
      contrastText: "#fff",
    },
    secondary: {
      light: "#eeeeee",
      main: "#e4e4e4",
      dark: "#7f7f7f",
      contrastText: "#000",
    },
  },
});

export default standardTheme;
