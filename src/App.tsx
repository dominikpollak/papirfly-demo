import { createTheme, ThemeProvider } from "@mui/material";
import { MainPage } from "./pages/MainPage";

function App() {
  const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            backgroundColor: "#407cff",
            fontWeight: 500,
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: "#9fa7bb",
          },
        },
      },
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <MainPage />
      </ThemeProvider>
    </>
  );
}

export default App;
