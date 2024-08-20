'use client';

import './global.scss';

import { createContext, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { baselightTheme } from '@/utils/theme/DefaultColors';

export const globalData = createContext({});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  let [darkMode, setDarkMode] = useState(false);

  return (
    <globalData.Provider value={{ darkMode, setDarkMode }}>
      <html lang={`en`}>
        <body className={`dasherBody ${darkMode ? `dark` : `light`}`}>
          <ThemeProvider theme={baselightTheme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </globalData.Provider>
  );
}