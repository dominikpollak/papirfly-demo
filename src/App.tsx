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
            boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.2)",
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
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#e2e7ee",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#c5ccda",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#407cff",
            },
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
