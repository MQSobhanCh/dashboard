import { createTheme, ThemeProvider } from "@mui/material/styles";
import type { FC, PropsWithChildren } from "react";
import { useGlobalStore } from "../stores/global.store";

const MuiThemeProvider: FC<PropsWithChildren> = ({ children }) => {

  const { theme: themeMode } = useGlobalStore();

  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: '#10b981'
      }
    }
  })

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}

export default MuiThemeProvider
