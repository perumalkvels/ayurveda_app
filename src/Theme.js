import React, { createContext,useContext, useMemo } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import { useSelector } from 'react-redux';

import { amber,green, grey,blue,lightBlue,deepOrange,red,pink, yellow  } from '@mui/material/colors';


const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

export const AppThemeProvider = ({ children }) => {

  const appTheme = useSelector(state => state.appData.appTheme);


  const getDesignTokens = (mode) => ({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            primary:{
              main:blue[800],
            },
            secondary: {
                main:blue[400],
            },
            error: {
                main:red[800],
            },
            warning: {
              main: yellow[900],
            },
            success: {
              main:green[900],
            },
            background: {
              default:  '#fff',
              paper: grey[200],
            },
            text: {
              primary: grey[900],
              secondary: grey[800],
              // disbled: grey[400],
            },
            icon: {
                active: '#000',
                inActive: '#fff',
            }
          }
        : {
            // palette values for dark mode
            primary:{
                main:grey[800],
            },
            background: {
              default: grey[900],
              paper: grey[900],
            },
            text: {
              primary: '#fff',
              secondary: '#fff',
            },
            icon: {
                active: '#fff',
                inActive:  grey[500],    
            }
          }),
    },
    typography:{
      fontFamily: 'Noto Sans Tamil'
    }
  });

  const theme = useMemo(() => createTheme(getDesignTokens(appTheme)), [appTheme]);

  return (
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
  );
};

