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
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            height: 35,
            fontSize: 14,
            "& .MuiInputBase-input": {
              padding: "6px 10px",
              fontSize: 14,
            },
          },
          notchedOutline: {
            borderColor: "#e2e7ee",
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          outlined: {
            height: 35,
            fontSize: 12,
            display: "flex",
            alignItems: "center",
          },
          icon: {
            color: "#9fa7bb",
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            fontSize: 14,
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            fontSize: 12,
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <MainPage />
    </ThemeProvider>
  );
}

export default App;
